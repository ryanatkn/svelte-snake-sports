<svelte:options immutable={false} />

<script lang="ts">
	import {browser} from '$app/env';
	import {base} from '$app/paths';
	import {writable} from 'svelte/store';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import DomRenderer from '$lib/renderers/dom/DomRenderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import Settings from '$lib/Settings.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	import {initGameState, updateGameState} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import StageTimedAppleProgress from '$lib/StageTimedAppleProgress.svelte';
	import Instructions from '$lib/sports/ssspeed/Instructions.svelte';

	// TODO BLOCK CONTINUE!!
	// show reset button
	// show high scores
	// add win state for ssspeed (show an explosive flourish of tada and colored snake emoji)
	// fix settings types
	// fix settings dimensions to persist on reset
	// responsive rendering

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	let showSettings = false;

	$: state = game?.state;
	$: events = game?.events;
	$: status = game?.status;

	// TODO maybe these shouldn't be stores?
	const baseTickDuration = writable(Math.round(1000 / 6)); // the starting tick duration, may be modified by gameplay
	const currentTickDuration = writable($baseTickDuration);
	const tickDurationDecay = writable(0.5);
	const tickDurationMin = writable(17);
	const tickDurationMax = writable(2000);

	// TODO BLOCK how does this game work? do we have a fixed amount of time? then it's not really slow & steady ...
	let applesEaten = 0;
	let applesEatenSinceCollision = 0;
	const APPLES_EATEN_TO_WIN = 50;

	let currentTime = 0;
	$: currentTime += $clock.dt;

	const bestTime = writable<number | null>(
		(browser && Number(localStorage.getItem('bestTime'))) || null,
	);

	const tick = () => {
		if (!game || !$state || !$events || $status !== 'initial') return;
		// TODO maybe serialize input state as param instead of `game`?
		$state = updateGameState($state, game);

		for (const event of $events) {
			switch (event.name) {
				case 'eat_apple': {
					applesEaten++;
					applesEatenSinceCollision++;
					$currentTickDuration *= $tickDurationDecay ** (1 / applesEatenSinceCollision ** 1.7);
					break;
				}
				case 'snake_collide_self':
				case 'snake_collide_bounds': {
					// TODO BLOCK ok so at this point, what happens?
					// We want to freeze the simulation, and show the status of the snake as damaged,
					// but unlike ClasssicSnake, we want to allow pressing a key to immediately continue on
					// as if nothing happened, EXCEPT it should reset the tick duration to the initial value,
					// but KEEP your apple count. We could also make it reduce the tick duration,
					// and not entirely reset it, but that's less important.
					$currentTickDuration = $baseTickDuration; // TODO BLOCK doesn't work as intended because currentTickDuration is fully recalulated, not incrementally
					applesEatenSinceCollision = 0;
					game.movementDirection.set(null);
					break;
				}
			}
		}

		// TODO BLOCK is this right? or do we not want to emit this event?
		// maybe we set `game.status` and other values directly?
		// victory` -- `{score: number} | {time: number} | {turns: number} | null`
		if (applesEaten > 50) {
			// TODO BLOCK or should we detect when time runs out? number of turns?
		}

		// TODO immutable? move this elsewhere? like `afterTick`?
		// maybe this should be `onTick` and the SnakeGame's `tick` function does this work?
		if ($events.length) $events.length = 0;
	};

	// TODO BLOCK `tickDurationDecay` belongs on the game state here, should be like 0.85 or something --
	// does that mean `tickDuration` belongs on it as well? Probably so? Then the decay should be nullable,
	// and `tickDurationMax` and `tickDurationMin` should be there too
</script>

<div class="SsspeedSnake">
	<SnakeGame
		bind:this={game}
		toInitialState={() => initGameState(toDefaultGameState())}
		toInitialMovementDirection={() => null}
		{tick}
		onReset={() => {
			$currentTickDuration = $baseTickDuration;
			currentTime = 0;
		}}
	/>
	{#if game}
		<DomRenderer {game}>
			{#if applesEaten === 0}
				<Instructions {bestTime} applesToWin={APPLES_EATEN_TO_WIN} />
			{/if}
		</DomRenderer>
		<Ticker {clock} tickDuration={currentTickDuration} {tick} />
		<StageTimedAppleProgress
			{applesEaten}
			applesToWin={APPLES_EATEN_TO_WIN}
			{currentTime}
			{bestTime}
		/>
		<StageControls {clock} {tick} {game} />
		<section class="markup column-sm">
			<div>
				<strong>to queue a move</strong>: arrow keys, <code>wasd</code>, <code>hjkl</code>
			</div>
			<div>
				<strong>to move and end turn</strong>: <code>ctrl</code> or <code>shift</code>
			</div>
			<div>
				<strong>toggle clock</strong>: <code>Backtick `</code>
			</div>
			<div>
				<strong>take one turn</strong>: <code>1</code>
			</div>
		</section>
		<section class="centered">
			<audio src="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls />
		</section>
		<section class="centered">
			<button on:click={() => (showSettings = !showSettings)}
				>{#if showSettings}stash settings{:else}show settings{/if}</button
			>
			{#if showSettings}
				<Stats {game} tickDuration={currentTickDuration} />
				<Settings
					{game}
					{baseTickDuration}
					{tickDurationMin}
					{tickDurationMax}
					{tickDurationDecay}
				/>
			{/if}
		</section>
	{/if}
</div>

<style>
	.SsspeedSnake {
		display: flex;
		justify-content: center;
		padding-top: var(--spacing_xl3);
		flex-direction: column;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
</style>
