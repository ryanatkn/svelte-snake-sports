<script lang="ts">
	// TODO invincible snake: SimpleSnake but you can press spacebar to be invincible for a moment

	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/games/simple/SimpleSnake.svelte` for the same thing but simplified.

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createClock} from '$lib/clock';
	import {browser} from '$app/env';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	// import { createGameLoop } from '$lib/createGameLoop';

	const clock = createClock({running: browser});

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	$: game?.update($clock.dt);

	let showSettings = false;

	const snakeGameState = {};

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

<div class="InvincibleSnake">
	<SnakeGame bind:this={game} state={snakeGameState} />
	{#if game}
		<Renderer {game} />
		<Score {game} />
		<button on:click={() => (showSettings = !showSettings)}
			>{#if showSettings}hide settings{:else}show settings{/if}</button
		>
		{#if showSettings}
			<Settings {game} />
		{/if}
	{/if}
</div>

<style>
	.InvincibleSnake {
		display: flex;
		justify-content: center;
		padding-top: 64px;
		flex-direction: column;
		align-items: center;
	}
</style>
