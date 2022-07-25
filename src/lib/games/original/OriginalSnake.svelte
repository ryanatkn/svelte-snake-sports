<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/games/simple/SimpleSnake.svelte` for the same thing but simplified.
	import {onDestroy} from 'svelte';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createGameLoop} from '$lib/createGameLoop';

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	// TODO or pass a block store?
	const cancelGameLoop = createGameLoop((dt) => {
		if (game) {
			// Run all logic on the game for this time delta (dt).
			// The update function is expected to be run at least every 30-60fps.
			game.update(dt);
		}

		// Tell our renderer to update.
		// This could be refactored depending on the render method,
		// but in this case we're telling React to redraw at 60fps, which is not recommended!
		// renderGame(game);
	});

	onDestroy(cancelGameLoop);
</script>

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
