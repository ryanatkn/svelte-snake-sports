<svelte:options immutable={false} />

<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/sports/simple/SimpleSnake.svelte` for the same thing but simplified.

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import {browser} from '$app/env';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	// import { createGameLoop } from '$lib/createGameLoop';
	import {initGameState, updateGameState} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import ClockControls from '$lib/ClockControls.svelte';
	import DirectionalControls from '$lib/DirectionalControls.svelte';
	import MovementCommandQueue from '$lib/MovementCommandQueue.svelte';

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	let state = toDefaultGameState(); // TODO put this in a writable?

	let tickDuration = Math.round(1000 / 6);

	let showSettings = true;

	const onKeydown = (e: KeyboardEvent) => {
		const {key} = e;
		if (key === '`') {
			clock.toggle();
		}
	};

	$: movementCommandQueue = game?.input.movementCommandQueue;
	$: currentCommand = $movementCommandQueue?.[0];

	const onTick = () => (state = updateGameState(state, game!.input));
</script>

<svelte:window on:keydown={onKeydown} />

<div class="ClasssicSnake">
	<SnakeGame bind:this={game} {state} {initGameState} />
	{#if game}
		<Renderer {state} />
		<div class="scores-and-stats">
			<Score {state} />
			<Stats {state} />
			<div class="padded-md">
				<DirectionalControls
					selectedDirection={currentCommand}
					select={(d) => game?.inputMovementCommand(d)}
				/>
			</div>
		</div>
		{#if movementCommandQueue}
			<div class="padded-md">
				<MovementCommandQueue {movementCommandQueue} />
			</div>
		{/if}
		<section class="centered">
			<Ticker {clock} {tickDuration} tick={onTick} />
			<ClockControls {clock} />
		</section>
		<section class="centered">
			<button on:click={() => (showSettings = !showSettings)}
				>{#if showSettings}stash settings{:else}show settings{/if}</button
			>
			{#if showSettings}
				<Settings {state} bind:tickDuration />
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
	.scores-and-stats {
		display: flex;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
</style>
