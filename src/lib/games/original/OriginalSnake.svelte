<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/games/simple/SimpleSnake.svelte` for the same thing but simplified.

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createClock} from '$lib/clock';
	import {browser} from '$app/env';
	// import { createGameLoop } from '$lib/createGameLoop';

	const clock = createClock({running: browser});

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	$: game?.update($clock.dt);

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
	<SnakeGame bind:this={game} />
	{#if game}
		<Renderer {game} />
	{/if}
</div>

<style>
	.OriginalSnake {
		display: flex;
		justify-content: center;
		padding-top: 64px;
	}
</style>
