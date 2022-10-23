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
	import {toDefaultGameState} from '$lib/SnakeGameState';
	import {
		initGameState,
		spawnRandomShape6a,
		toApples,
		updateSnakeGameState,
	} from '$lib/updateSnakeGameState';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import ReadyInstructions from '$lib/sports/buncheses/ReadyInstructions.svelte';
	import FailInstructions from '$lib/sports/buncheses/FailInstructions.svelte';
	import TextBurst from '$lib/TextBurst.svelte';
	import ScaledSnakeRenderer from '$lib/ScaledSnakeRenderer.svelte';
	import {Entity} from '$lib/Entity';
	import ControlsInstructions from '$lib/ControlsInstructions.svelte';
	import {setCurrentTickDuration} from '$lib/SnakeGame';
	import GameAudio from '$lib/GameAudio.svelte';

	const storageKey = 'buncheses_high_score';

	export let game: SnakeGame | undefined = undefined;
	export let audio: GameAudio | undefined = undefined;

	// TODO refactor all of this, lots of copypaste

	export let pointerDown = false;
	export let pointerX: number | undefined = undefined;
	export let pointerY: number | undefined = undefined;

	let snakeX: number;
	let snakeY: number;
	$: if (game && pointerDown && pointerX !== undefined && pointerY !== undefined) {
		game.handlePointerInput(snakeX, snakeY, pointerX, pointerY);
	}

	const clock = setClock(createClock({running: true}));

	let showSettings = false;

	$: state = game?.state;
	$: mapWidth = $state?.mapWidth;
	$: mapHeight = $state?.mapHeight;
	$: events = game?.events;
	$: status = game?.status;

	// TODO better way to do this? event or callbacks?
	$: if ($status === 'ready') $status = 'playing';

	const CLUSTER_COUNT = 6; // hardcoding to a particular shape

	let applesEaten = 0;
	let bunchesEaten = 0;
	const highestClustersEaten = writable<number>(Number(localStorage.getItem(storageKey)) || 0);

	const restart = (): void => {
		if (!game) return;
		game.reset();
		game.start();
	};

	// TODO refactor with the other impls
	// TODO maybe these shouldn't be stores? or maybe the tick logic should be extracted to a single store/object?
	export const tickDurationDecay = writable(0.97);
	export const baseTickDuration = writable(Math.round(1000 / 2)); // the starting tick duration, may be modified by gameplay
	export const currentTickDuration = setCurrentTickDuration(writable($baseTickDuration));
	export const tickDurationMin = writable(17);
	export const tickDurationMax = writable(2000);

	let autoAspectRatio: Writable<boolean> | undefined;
	let aspectRatio: Writable<number> | undefined;

	// TODO is there a better place to do this? imperatively after updating the state?
	$: if (bunchesEaten > $highestClustersEaten) {
		$highestClustersEaten = bunchesEaten;
		localStorage.setItem(storageKey, bunchesEaten + ''); // TODO use helper on store instead
	}

	const tick = (): boolean => {
		if (!game || !$state || !$events || $status !== 'playing') {
			return false;
		}
		// TODO maybe serialize input state as param instead of `game`?
		$state = updateSnakeGameState($state, game);

		let ateApple = false;

		for (const event of $events) {
			switch (event.name) {
				case 'eat_apple': {
					ateApple = true;
					applesEaten++;
					if (applesEaten === CLUSTER_COUNT) {
						bunchesEaten++;
						applesEaten = 0;
					}
					break;
				}
				case 'snake_collide_self':
				case 'snake_collide_bounds': {
					game.end('fail');
					if (bunchesEaten === 0) {
						restart();
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
				Math.round($baseTickDuration! * $tickDurationDecay ** (bunchesEaten * CLUSTER_COUNT)),
			),
		);

		// Are we eating a bunch but then stopped?
		// If so despawn the current apples and spawn a new bunch.
		if (applesEaten && !ateApple) {
			applesEaten = 0;
			$state.apples.length = 0;
			game.helpers!.spawnApples($state, game);
		}

		return true;
	};

	const MAX_SPAWN_ATTEMPTS = 30; // TODO where does this belong?
</script>

<div
	class="ClasssicSnake"
	class:game-fail={$status === 'fail'}
	class:game-ready={$status === 'ready'}
>
	<SnakeGame
		bind:this={game}
		{storageKey}
		toInitialMovementDirection={() => 'up'}
		{tick}
		onReset={() => {
			applesEaten = 0;
			bunchesEaten = 0;
			$currentTickDuration = $baseTickDuration;
		}}
		toInitialState={() => {
			const state = initGameState(toDefaultGameState({mapWidth, mapHeight}));
			// spawn the apples
			state.apples = [
				new Entity(4, 3),
				new Entity(4, 2),
				new Entity(5, 2),
				new Entity(5, 1),
				new Entity(4, 1),
				new Entity(3, 1),
			];
			return state;
		}}
		spawnApples={(state, game) => {
			if (state.apples.length) return;
			let attempt = 0;
			while (attempt < MAX_SPAWN_ATTEMPTS) {
				attempt++;
				const spawned = spawnRandomShape6a(state);
				if (!spawned) continue;
				for (const position of spawned) {
					toApples(state, game).push(new Entity(position.x, position.y));
				}
				return;
			}
			// Failed to place the bunch, so end the game successfully --
			// this isn't good but it's the least worst easiest option I can think of right now.
			// A better design may be to query for possible locations
			// rather than blindly attempting to place shapes,
			// but that seems really hard, too hard for the stage this project is at.
			game.end('win');
		}}
	/>
	{#if game}
		<Gamespace bind:pointerDown bind:pointerX bind:pointerY>
			<ScaledSnakeRenderer bind:autoAspectRatio bind:aspectRatio let:worldWidth let:worldHeight>
				<DomRenderer {game} width={worldWidth} height={worldHeight} bind:snakeX bind:snakeY />
			</ScaledSnakeRenderer>
			<svelte:fragment slot="overlay">
				{#if bunchesEaten === 0}
					<ReadyInstructions {highestClustersEaten} />
				{:else if $status === 'fail'}
					<FailInstructions {restart} {bunchesEaten} {highestClustersEaten}>
						<div class="text-burst-wrapper">
							<TextBurst count={50} items={['🍎', '💥', '🦴', '🦴']} />
						</div>
					</FailInstructions>
				{:else if $status === 'win'}
					<!-- This is unlikely to happen, is just a fallback -->
					<FailInstructions {restart} {bunchesEaten} {highestClustersEaten}>
						<div class="text-burst-wrapper">
							<TextBurst count={50} items={['🐍', '🐍', '🌸', '🌺']} hueRotationMax={360} />
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
						progressKey={bunchesEaten === 0 ? undefined : bunchesEaten}>{bunchesEaten}</Score
					>
					{#if $highestClustersEaten !== bunchesEaten}
						<Score title="the most apples you've ever eaten">{$highestClustersEaten}</Score>
					{/if}
				</div>
				<Ticker {clock} tickDuration={currentTickDuration} {tick} />
				<StageControls {clock} {tick} {game} />
				<section class="panel" style:padding="var(--spacing_xl)">
					<ControlsInstructions />
				</section>
				<section class="centered markup">
					<p>
						<a href="https://www.serpentsoundstudios.com/">Alexander Nakarada</a> -
						<a href="/assets/Alexander_Nakarada__Lurking_Sloth.mp3">Lurking Sloth</a>
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
