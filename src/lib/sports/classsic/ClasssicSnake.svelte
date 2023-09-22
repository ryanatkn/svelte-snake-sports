<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/sports/simple/SimpleSnake.svelte` for the same thing but simplified.
	import {writable, type Writable} from 'svelte/store';
	import {base} from '$app/paths';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Gamespace from '$lib/Gamespace.svelte';
	import DomRenderer from '$lib/renderers/dom/DomRenderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState, type SnakeGameState} from '$lib/SnakeGameState';
	import {initGameState, updateSnakeGameState} from '$lib/updateSnakeGameState';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import ReadyInstructions from '$lib/sports/classsic/ReadyInstructions.svelte';
	import FailInstructions from '$lib/sports/classsic/FailInstructions.svelte';
	import TextBurst from '$lib/TextBurst.svelte';
	import ScaledSnakeRenderer from '$lib/ScaledSnakeRenderer.svelte';
	import ControlsInstructions from '$lib/ControlsInstructions.svelte';
	import {setCurrentTickDuration} from '$lib/SnakeGame';
	import GameAudio from '$lib/GameAudio.svelte';
	import Dimensions from '$lib/Dimensions.svelte';
	import {assertNumber, getFromStorage, setInStorage} from '$lib/storage';

	const storageKey = 'classsic_high_score';
	const clock = setClock(createClock({running: true}));
	const dimensions = writable({width: 0, height: 0});

	export let game: SnakeGame | undefined = undefined;
	export let audio: GameAudio | undefined = undefined;
	export let toInitialState = (): SnakeGameState =>
		initGameState(toDefaultGameState({mapWidth, mapHeight}));

	// TODO refactor all of this, lots of copypaste
	export let pointerDown = false;
	export let pointerX: number | undefined = undefined;
	export let pointerY: number | undefined = undefined;
	let snakeX: number;
	let snakeY: number;
	$: if (game && pointerDown && pointerX !== undefined && pointerY !== undefined) {
		game.handlePointerInput(snakeX, snakeY, pointerX, pointerY);
	}

	let showSettings = false;

	$: state = game?.state;
	$: mapWidth = $state?.mapWidth;
	$: mapHeight = $state?.mapHeight;
	$: events = game?.events;
	$: status = game?.status;

	// TODO better way to do this? event or callbacks?
	$: if ($status === 'ready') $status = 'playing';

	let applesEaten = 0;
	const highestApplesEaten = writable(getFromStorage(storageKey, assertNumber) ?? 0);

	const restart = (): void => {
		if (!game) return;
		game.reset();
		game.start();
	};

	// TODO refactor with the other impls
	// TODO maybe these shouldn't be stores? or maybe the tick logic should be extracted to a single store/object?
	export const tickDurationDecay = writable(0.97);
	export const baseTickDuration = writable(Math.round(1000 / 6)); // the starting tick duration, may be modified by gameplay
	export const currentTickDuration = setCurrentTickDuration(writable($baseTickDuration));
	export const tickDurationMin = writable(17);
	export const tickDurationMax = writable(2000);

	let autoAspectRatio: Writable<boolean> | undefined;
	let aspectRatio: Writable<number> | undefined;

	// TODO is there a better place to do this? imperatively after updating the state?
	$: if (applesEaten > $highestApplesEaten) {
		$highestApplesEaten = applesEaten;
		setInStorage(storageKey, applesEaten);
	}

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
					break;
				}
				case 'snake_collide_self':
				case 'snake_collide_bounds': {
					game.end('fail');
					if (applesEaten === 0) {
						game.reset();
						game.start();
					} else {
						// TODO show instructions
					}
					break;
				}
			}
		}

		$currentTickDuration = Math.max(
			$tickDurationMin,
			Math.min(
				$tickDurationMax,
				Math.round($baseTickDuration! * $tickDurationDecay ** applesEaten),
			),
		);

		return true;
	};
</script>

<Dimensions {dimensions} />

<div
	class="ClasssicSnake"
	class:game-fail={$status === 'fail'}
	class:game-ready={$status === 'ready'}
>
	<SnakeGame
		bind:this={game}
		{storageKey}
		{toInitialState}
		toInitialMovementDirection={() => 'up'}
		{tick}
		onReset={() => {
			applesEaten = 0;
			$currentTickDuration = $baseTickDuration;
		}}
	/>
	{#if game}
		<Gamespace bind:pointerDown bind:pointerX bind:pointerY>
			<ScaledSnakeRenderer
				{dimensions}
				bind:autoAspectRatio
				bind:aspectRatio
				let:worldWidth
				let:worldHeight
			>
				<DomRenderer {game} width={worldWidth} height={worldHeight} bind:snakeX bind:snakeY />
			</ScaledSnakeRenderer>
			<svelte:fragment slot="overlay">
				{#if applesEaten === 0}
					<ReadyInstructions {highestApplesEaten} />
				{:else if $status === 'fail'}
					<FailInstructions {restart} {applesEaten} {highestApplesEaten}>
						<div class="text-burst-wrapper">
							<TextBurst count={50} items={['🐍', '💥', '🦴', '🦴']} />
						</div>
					</FailInstructions>
				{/if}
			</svelte:fragment>
		</Gamespace>
		{#if autoAspectRatio && aspectRatio}
			<div class="info">
				<div class="scores">
					<Score
						title="apples eaten this try"
						progressKey={applesEaten === 0 ? undefined : applesEaten}>{applesEaten}</Score
					>
					{#if $highestApplesEaten !== applesEaten}
						<Score title="the most apples you've ever eaten">{$highestApplesEaten}</Score>
					{/if}
				</div>
				<Ticker {clock} tickDuration={currentTickDuration} {tick} />
				<StageControls {clock} {tick} {game} />
				<section class="panel" style:padding="var(--spacing_xl)">
					<ControlsInstructions />
				</section>
				<section class="centered prose">
					<p>
						<a href="https://www.serpentsoundstudios.com/">Alexander Nakarada</a> -
						<a href="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3">Lurking Sloth</a>
					</p>
					<GameAudio song="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3" bind:this={audio} />
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
							{autoAspectRatio}
							{aspectRatio}
						/>
					{/if}
				</section>
			</div>
		{/if}
	{/if}
</div>

<style>
	.ClasssicSnake {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
	.scores {
		display: flex;
	}
	.text-burst-wrapper {
		font-size: var(--size_xl5);
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
