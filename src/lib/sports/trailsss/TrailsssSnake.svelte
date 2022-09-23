<script lang="ts">
	import {browser} from '$app/environment';
	import {writable} from 'svelte/store';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Gamespace from '$lib/Gamespace.svelte';
	import DomRenderer from '$lib/renderers/dom/DomRenderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import Settings from '$lib/Settings.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState, type SnakeGameState} from '$lib/SnakeGameState';
	import {initGameState, spawnRandomTrail, updateSnakeGameState} from '$lib/updateSnakeGameState';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import TimedScores from '$lib/TimedScores.svelte';
	import ReadyInstructions from '$lib/sports/trailsss/ReadyInstructions.svelte';
	import WinInstructions from '$lib/sports/trailsss/WinInstructions.svelte';
	import TextBurst from '$lib/TextBurst.svelte';
	import ScaledSnakeRenderer from '$lib/ScaledSnakeRenderer.svelte';
	import ControlsInstructions from '$lib/ControlsInstructions.svelte';
	import {SSSPEED_HIGH_SCORE_KEY} from '$lib/storage';
	import {
		setCurrentTickDuration,
		setRendererWidth,
		setRendererHeight,
		type ISnakeGame,
	} from '$lib/SnakeGame';
	import GameAudio from '$lib/GameAudio.svelte';
	import {toDirection} from '$lib/direction';

	const clock = setClock(createClock({running: browser}));

	export let game: SnakeGame | undefined = undefined;
	export let audio: GameAudio | undefined = undefined;

	// TODO refactor all of this, lots of copypaste
	export let rendererRect: DOMRect | undefined = undefined; // exposed for binding
	export let pointerDown = false;
	export let pointerX: number | undefined = undefined;
	export let pointerY: number | undefined = undefined;
	let snakeX: number;
	let snakeY: number;
	$: rendererRectLeft = rendererRect?.left || 0;
	$: rendererRectTop = rendererRect?.top || 0;
	$: snakeScreenX = snakeX + rendererRectLeft;
	$: snakeScreenY = snakeY + rendererRectTop;
	$: if (game && pointerDown && pointerX !== undefined && pointerY !== undefined) {
		game.start(); // TODO is a bit hacky, is the one thing that differs game to game
		const direction = toDirection(snakeScreenX, snakeScreenY, pointerX, pointerY);
		if (direction) {
			game.setMovementCommand(direction);
		}
	}

	let showSettings = false;

	$: state = game?.state;
	$: mapWidth = $state?.mapWidth;
	$: mapHeight = $state?.mapHeight;
	$: events = game?.events;
	$: status = game?.status;

	// TODO refactor with the other impls
	// TODO maybe these shouldn't be stores? or maybe the tick logic should be extracted to a single store/object?
	export const baseTickDuration = writable(Math.round(1000 / 2)); // the starting tick duration, may be modified by gameplay
	export const currentTickDuration = setCurrentTickDuration(writable($baseTickDuration));
	export const tickDurationDecay = writable(0.97);
	export const tickDurationMin = writable(17);
	export const tickDurationMax = writable(2000);
	// TODO belongs elsewhere
	export const autoScaleRenderer = writable(true);
	export const rendererWidth = setRendererWidth(writable(0));
	export const rendererHeight = setRendererHeight(writable(0));
	export const autoAspectRatio = writable(false);
	export const aspectRatio = writable(1.0);

	let applesEaten = 0;
	let applesEatenSinceCollision = 0;
	const APPLES_EATEN_TO_WIN = 66; // sixxty six applesss

	const restart = (): void => {
		if (!game) return;
		game.reset();
		game.start();
	};

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
		$state = updateSnakeGameState($state, game);

		for (const event of $events) {
			switch (event.name) {
				case 'eat_apple': {
					applesEaten++;
					applesEatenSinceCollision++;
					break;
				}
				case 'snake_collide_self':
				case 'snake_collide_bounds': {
					// TODO maybe display some damaged status?
					applesEatenSinceCollision = 0;
					game.resetMovementCommands();
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

		$currentTickDuration = Math.max(
			$tickDurationMin,
			Math.min(
				$tickDurationMax,
				Math.round($baseTickDuration * $tickDurationDecay ** applesEatenSinceCollision),
			),
		);

		return true;
	};

	const TRAIL_LENGTH = 8; // TODO BLOCK trail length? should it increase as you go or be fixed width?

	// TODO hacky, the `game` may be undefined because `toInitialState` is called before `game` is available
	const spawnApples = (state: SnakeGameState, game: ISnakeGame | undefined): void => {
		const spawned = spawnRandomTrail(state, game, TRAIL_LENGTH);
		console.log(`spawned`, spawned);
		// As a failsafe, if we can't spawn anything and there's no apples left, end the game.
		if (!spawned && !state.apples.length) {
			game?.end('win');
		}
	};
</script>

<div
	class="TrailsssSnake"
	class:game-win={$status === 'win'}
	class:game-ready={$status === 'ready'}
>
	<SnakeGame
		bind:this={game}
		{tick}
		onReset={() => {
			$currentTickDuration = $baseTickDuration;
			currentTime = 0;
			applesEaten = 0;
			applesEatenSinceCollision = 0;
		}}
		toInitialState={() => {
			const state = initGameState(toDefaultGameState({mapWidth, mapHeight}));
			// spawn the apples
			state.apples.length = 0;
			state.apples = [];
			spawnApples(state, game);
			return state;
		}}
		{spawnApples}
	/>
	{#if game}
		<Gamespace bind:pointerDown bind:pointerX bind:pointerY>
			<!-- TODO `marginBottom={100}` is hardcoding the scores height -->
			<ScaledSnakeRenderer
				autoScaleRenderer={$autoScaleRenderer}
				rendererWidth={$rendererWidth}
				rendererHeight={$rendererHeight}
				autoAspectRatio={$autoAspectRatio}
				aspectRatio={$aspectRatio}
				marginBottom={100}
				updateRendererDimensions={(width, height) => {
					$rendererWidth = width;
					$rendererHeight = height;
				}}
				bind:rect={rendererRect}
				let:worldWidth
				let:worldHeight
			>
				<DomRenderer {game} width={worldWidth} height={worldHeight} bind:snakeX bind:snakeY />
			</ScaledSnakeRenderer>
			<svelte:fragment slot="overlay">
				{#if applesEaten === 0}
					<ReadyInstructions {bestTime} applesToWin={APPLES_EATEN_TO_WIN} />
				{:else if $status === 'win'}
					<WinInstructions
						{restart}
						time={currentTime}
						{bestTime}
						applesToWin={APPLES_EATEN_TO_WIN}
					>
						<div class="text-burst-wrapper">
							<TextBurst count={50} items={['🐍', '🐍', '🌸', '🌺']} hueRotationMax={360} />
						</div>
					</WinInstructions>
				{/if}
			</svelte:fragment>
		</Gamespace>
		<div class="info">
			<Ticker {clock} tickDuration={currentTickDuration} {tick} />
			<TimedScores {applesEaten} applesToWin={APPLES_EATEN_TO_WIN} {currentTime} {bestTime} />
			<StageControls {clock} {tick} {game} />
			<section class="panel" style:padding="var(--spacing_xl)">
				<ControlsInstructions />
			</section>
			<section class="centered markup">
				<p>
					<a href="https://www.serpentsoundstudios.com/">Alexander Nakarada</a> -
					<a href="/assets/Alexander_Nakarada__Horde_of_Geese.mp3">Horde of Geese</a>
				</p>
				<GameAudio song="/assets/Alexander_Nakarada__Horde_of_Geese.mp3" bind:this={audio} />
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
						{autoScaleRenderer}
						{rendererWidth}
						{rendererHeight}
						{autoAspectRatio}
						{aspectRatio}
					/>
				{/if}
			</section>
		</div>
	{/if}
</div>

<style>
	.TrailsssSnake {
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
		/* TODO hacky positioning */
		left: 6rem;
		top: 2rem;
		width: 0;
		height: 0;
	}
	/* TODO better name for this? */
	.info {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
