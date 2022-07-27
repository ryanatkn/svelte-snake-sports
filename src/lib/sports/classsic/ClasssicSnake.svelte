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
	import {initGameState, updateGameState, inputMovementCommand} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import ClockControls from '$lib/ClockControls.svelte';

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

	$: currentCommand = state.movementCommandQueue[0];
	$: console.log(`currentCommand`, currentCommand);
	$: console.log(`state.movementCommandQueue`, state.movementCommandQueue);
</script>

<svelte:window on:keydown={onKeydown} />

<div class="ClasssicSnake">
	<SnakeGame bind:this={game} {state} {initGameState} {inputMovementCommand} />
	{#if game}
		<Renderer {state} />
		<div class="scores-and-stats">
			<Score {state} />
			<Stats {state} />
		</div>
		<!-- TODO render the controls -->
		<div class="controls">
			<button
				class:selected={currentCommand === 'left'}
				on:click={() => inputMovementCommand(state, 'left')}>⬅</button
			>
			<button
				class:selected={currentCommand === 'up'}
				on:click={() => inputMovementCommand(state, 'up')}>⬆</button
			>
			<button
				class:selected={currentCommand === 'down'}
				on:click={() => inputMovementCommand(state, 'down')}>⬇</button
			>
			<button
				class:selected={currentCommand === 'right'}
				on:click={() => inputMovementCommand(state, 'right')}>➡</button
			>
		</div>
		<section class="centered">
			<Ticker {clock} {tickDuration} tick={() => (state = updateGameState(state))} />
			<ClockControls {clock} />
		</section>
		<section class="centered">
			<button on:click={() => (showSettings = !showSettings)}
				>{#if showSettings}hide settings{:else}show settings{/if}</button
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
	.controls {
		display: flex;
	}
</style>
