<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/games/simple/SimpleSnake.svelte` for the same thing but simplified.

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createClock} from '$lib/clock';
	import {browser} from '$app/env';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	// import { createGameLoop } from '$lib/createGameLoop';
	import {initGameState, updateGameState, inputMovementCommand} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';

	const clock = createClock({running: browser});

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	const state = toDefaultGameState();

	let showSettings = false;

	// // TODO or pass a block store?
	// const cancelGameLoop = createGameLoop((dt) => {
	// 	if (game) {
	// 		// Run all logic on the game for this time delta (dt).
	// 		// The update function is expected to be run at least every 30-60fps.
	// 		game.update(dt);
	// 	}

	// 	// Tell our renderer to update.
	// 	// This could be refactored depending on the render method,
	// 	// but in this case we're telling React to redraw at 60fps, which is not recommended!
	// 	// renderGame(game);
	// });

	// onDestroy(cancelGameLoop);

	const onKeydown = (e: KeyboardEvent) => {
		const {key} = e;
		if (key === '`') {
			clock.toggle();
		}
	};
</script>

<svelte:window on:keydown={onKeydown} />

<div class="OriginalSnake">
	<SnakeGame bind:this={game} {state} {initGameState} {inputMovementCommand} />
	{#if game}
		<Renderer {state} />
		<Score {state} />
		<Ticker {clock} tick={(_dt) => updateGameState(state)} />
		<button on:click={() => (showSettings = !showSettings)}
			>{#if showSettings}hide settings{:else}show settings{/if}</button
		>
		{#if showSettings}
			<Settings {state} />
		{/if}
	{/if}
</div>

<style>
	.OriginalSnake {
		display: flex;
		justify-content: center;
		padding-top: 64px;
		flex-direction: column;
		align-items: center;
	}
</style>
