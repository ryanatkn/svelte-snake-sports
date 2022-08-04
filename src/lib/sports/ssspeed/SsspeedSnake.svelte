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
	import StageTimedAppleProgress from '$lib/TimedScores.svelte';
	import ReadyInstructions from '$lib/sports/ssspeed/ReadyInstructions.svelte';
	import WinInstructions from '$lib/sports/ssspeed/WinInstructions.svelte';
	import TextBurst from '$lib/TextBurst.svelte';

	// TODO BLOCK CONTINUE!!
	// add win state for ssspeed (show an explosive flourish of tada and colored snake emoji)
	// add death state for classsic if you have >0 apples (flash the head red or something)

	// TODO after merging:
	// fix settings dimensions to persist on reset
	// responsive rendering and set pixel size of play area

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;

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

	let applesEaten = 0;
	let applesEatenSinceCollision = 0;
	const APPLES_EATEN_TO_WIN = 1;

	let currentTime = 0;
	$: if ($status === 'playing') currentTime += $clock.dt;

	const bestTime = writable<number | null>(
		(browser && Number(localStorage.getItem('ssspeed_high_score'))) || null,
	);

	const tick = (): boolean => {
		if (!game || !$state || !$events || $status !== 'playing') {
			return false;
		}

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
					// TODO maybe display some damaged status?
					$currentTickDuration = $baseTickDuration;
					applesEatenSinceCollision = 0;
					game.movementDirection.set(null);
					break;
				}
			}
		}

		if (applesEaten >= APPLES_EATEN_TO_WIN) {
			game.end('win');
			// TODO maybe an event instead? maybe like classsic,
			// don't set the high score immediately like this, wait til it's over
			if (!$bestTime || currentTime < $bestTime) {
				$bestTime = Math.round(currentTime);
				if (browser) localStorage.setItem('ssspeed_high_score', $bestTime + ''); // TODO use helper on store instead
			}
		}

		// TODO immutable? move this elsewhere? like `afterTick`?
		// maybe this should be `onTick` and the SnakeGame's `tick` function does this work?
		if ($events.length) $events.length = 0;

		return true;
	};
</script>

<div class="SsspeedSnake">
	<SnakeGame
		bind:this={game}
		toInitialState={() => initGameState(toDefaultGameState())}
		{tick}
		onReset={() => {
			$currentTickDuration = $baseTickDuration;
			currentTime = 0;
			applesEaten = 0;
			applesEatenSinceCollision = 0;
		}}
	/>
	{#if game}
		<DomRenderer {game}>
			{#if applesEaten === 0}
				<ReadyInstructions {bestTime} applesToWin={APPLES_EATEN_TO_WIN} />
			{:else if $status === 'win'}
				<WinInstructions time={currentTime} {bestTime} applesToWin={APPLES_EATEN_TO_WIN} />
				<div class="text-burst-wrapper">
					<TextBurst count={50} items={['🐍', '🐍', '🌸', '🌺']} />
				</div>
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
			<div><strong>to queue a move</strong>: arrow keys, <code>wasd</code>, <code>hjkl</code></div>
			<div><strong>to move and end turn</strong>: <code>ctrl</code> or <code>shift</code></div>
			<div><strong>toggle clock</strong>: <code>Backtick `</code></div>
			<div><strong>take one turn</strong>: <code>1</code></div>
			<div><strong>restart</strong>: <code>r</code></div>
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
		flex-direction: column;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
	.text-burst-wrapper {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
	}
</style>
