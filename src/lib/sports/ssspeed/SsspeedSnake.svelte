<!-- TODO refactor so this isn't needed -->
<svelte:options immutable={false} />

<script lang="ts">
	import {browser} from '$app/env';
	import {base} from '$app/paths';
	import {writable} from 'svelte/store';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Gamespace from '$lib/Gamespace.svelte';
	import DomRenderer from '$lib/renderers/dom/DomRenderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import Settings from '$lib/Settings.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	import {initGameState, spawnApples, updateGameState} from '$lib/mutableSnakeGameState';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import TimedScores from '$lib/TimedScores.svelte';
	import ReadyInstructions from '$lib/sports/ssspeed/ReadyInstructions.svelte';
	import WinInstructions from '$lib/sports/ssspeed/WinInstructions.svelte';
	import TextBurst from '$lib/TextBurst.svelte';
	import ScaledSnakeRenderer from '$lib/ScaledSnakeRenderer.svelte';
	import ControlsInstructions from '$lib/ControlsInstructions.svelte';
	import {SSSPEED_HIGH_SCORE_KEY} from '$lib/storage';

	// TODO after merging:
	// fix settings dimensions to persist on reset
	// responsive rendering and set pixel size of play area

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;

	let showSettings = false;

	$: state = game?.state;
	$: events = game?.events;
	$: status = game?.status;

	// TODO refactor with the other impls
	// TODO maybe these shouldn't be stores? or maybe the tick logic should be extracted to a single store/object?
	const baseTickDuration = writable(Math.round(1000 / 6)); // the starting tick duration, may be modified by gameplay
	const currentTickDuration = writable($baseTickDuration);
	const tickDurationDecay = writable(0.5);
	const tickDurationMin = writable(17);
	const tickDurationMax = writable(2000);

	// TODO belongs elsewhere
	const rendererWidth = writable(512);
	const rendererHeight = writable(512);

	let applesEaten = 0;
	let applesEatenSinceCollision = 0;
	const APPLES_EATEN_TO_WIN = 66; // sixxty six applesss

	let currentTime = 0;
	$: if ($status === 'playing') currentTime += $clock.dt;

	const bestTime = writable<number | null>(
		(browser && Number(localStorage.getItem(SSSPEED_HIGH_SCORE_KEY))) || null,
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
				if (browser) localStorage.setItem(SSSPEED_HIGH_SCORE_KEY, $bestTime + ''); // TODO use helper on store instead
			}
		}

		// TODO immutable? move this elsewhere? like `afterTick`?
		// maybe this should be `onTick` and the SnakeGame's `tick` function does this work?
		if ($events.length) $events.length = 0;

		return true;
	};
</script>

<div class="SsspeedSnake" class:game-win={$status === 'win'} class:game-ready={$status === 'ready'}>
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
		spawnApples={(state, game) => {
			if (state.apples.length + applesEaten + 1 < APPLES_EATEN_TO_WIN) {
				return spawnApples(state, game);
			}
		}}
	/>
	{#if game}
		<Gamespace>
			<ScaledSnakeRenderer {rendererWidth} {rendererHeight}>
				<DomRenderer {game} width={rendererWidth} height={rendererHeight} />
			</ScaledSnakeRenderer>
			{#if applesEaten === 0}
				<ReadyInstructions {bestTime} applesToWin={APPLES_EATEN_TO_WIN} />
			{:else if $status === 'win'}
				<WinInstructions time={currentTime} {bestTime} applesToWin={APPLES_EATEN_TO_WIN} />
				<div class="text-burst-wrapper">
					<TextBurst count={50} items={['🐍', '🐍', '🌸', '🌺']} hueRotationMax={360} />
				</div>
			{/if}
		</Gamespace>
		<Ticker {clock} tickDuration={currentTickDuration} {tick} />
		<TimedScores {applesEaten} applesToWin={APPLES_EATEN_TO_WIN} {currentTime} {bestTime} />
		<StageControls {clock} {tick} {game} />
		<section>
			<ControlsInstructions />
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
					{rendererWidth}
					{rendererHeight}
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
		font-size: var(--font_size_xl5);
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
	}
</style>
