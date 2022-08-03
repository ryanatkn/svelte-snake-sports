<svelte:options immutable={false} />

<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/sports/simple/SimpleSnake.svelte` for the same thing but simplified.
	import {browser} from '$app/env';
	import {base} from '$app/paths';
	import {writable} from 'svelte/store';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import DomRenderer from '$lib/renderers/dom/DomRenderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	import {initGameState, updateGameState} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import Instructions from '$lib/sports/classsic/Instructions.svelte';

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	let showSettings = false;

	$: state = game?.state;
	$: events = game?.events;
	$: status = game?.status;

	let score = 0;
	const highScore = writable<number>((browser && Number(localStorage.getItem('highScore'))) || 0);

	// TODO maybe these shouldn't be stores?
	const tickDurationDecay = writable(0.97);
	const baseTickDuration = writable(Math.round(1000 / 6)); // the starting tick duration, may be modified by gameplay
	const currentTickDuration = writable($baseTickDuration);
	const tickDurationMin = writable(17);
	const tickDurationMax = writable(2000);

	// TODO is there a better place to do this? imperatively after updating the state?
	$: if (score > $highScore) {
		console.log(`score`, score);
		$highScore = score;
		if (browser) localStorage.setItem('highScore', score + ''); // TODO use helper on store instead
	}

	const tick = () => {
		if (!game || !$state || !$events || $status !== 'initial') return;
		// TODO maybe serialize input state as param instead of `game`?
		$state = updateGameState($state, game);

		for (const event of $events) {
			switch (event.name) {
				case 'eat_apple': {
					score++;
					break;
				}
				case 'snake_collide_self':
				case 'snake_collide_bounds': {
					game.end('failure');
					game.start();
					score = 0; // TODO BLOCK should this be on some other event or hook?
					break;
				}
			}
		}
		// TODO immutable? move this elsewhere? like `afterTick`?
		// maybe this should be `onTick` and the SnakeGame's `tick` function does this work?
		if ($events.length) $events.length = 0;

		$currentTickDuration = Math.max(
			$tickDurationMin,
			Math.min(
				$tickDurationMax,
				Math.round($baseTickDuration! * $tickDurationDecay ** (1 + score)),
			),
		);

		// TODO after updating game, if it's reset we need to increment runCount,
		// so we probably want an events/effects/output system
	};
</script>

<div class="ClasssicSnake">
	<SnakeGame
		bind:this={game}
		toInitialState={() => initGameState(toDefaultGameState())}
		{tick}
		onReset={() => {
			$currentTickDuration = $baseTickDuration;
		}}
	/>
	{#if game}
		<DomRenderer {game}>
			{#if score === 0}
				<Instructions {highScore} />
			{/if}
		</DomRenderer>
		<Ticker {clock} tickDuration={currentTickDuration} {tick} />
		<Score {score} />
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
	.ClasssicSnake {
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
