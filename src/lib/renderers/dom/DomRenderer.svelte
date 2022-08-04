<svelte:options immutable={false} />

<script lang="ts">
	import type {Writable} from 'svelte/store';

	import Entity from '$lib/renderers/dom/Entity.svelte';
	import Tiles from '$lib/renderers/dom/Tiles.svelte';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	// TODO maybe rename this module to `SnameGameDomRenderer` or just `Renderer`?

	export let game: SnakeGame;
	export let width: Writable<number>;
	export let height: Writable<number>;

	$: ({state, movementDirection} = game);
	$: ({apples, snakeSegments, mapWidth, mapHeight} = $state);

	$: entityWidth = $width / mapWidth; // TODO Math.floor?
	$: entityHeight = $height / mapHeight;
</script>

<div class="renderer">
	<div class="layer">
		<Tiles {mapWidth} {mapHeight} tileWidth={entityWidth} tileHeight={entityHeight} />
		{#each apples as a (a.id)}
			<Entity x={a.x} y={a.y} classes="apple" width={entityWidth} height={entityHeight} />
		{/each}
		<div class="snake moving-{$movementDirection}">
			{#each snakeSegments as s (s.id)}
				<Entity x={s.x} y={s.y} width={entityWidth} height={entityHeight} />
			{/each}
		</div>
		<!-- TODO render the queued movement -->
	</div>
	<slot />
</div>

<style>
	.renderer {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
	}

	.layer {
		position: absolute;
		inset: 0;
	}

	/* TODO fix these global styles to not be global, is a relic of the port */

	.snake :global(.Entity) {
		background-color: #9da;
	}
	:global(.game-fail) .snake :global(.Entity) {
		background-color: rgb(221, 156, 153);
	}

	/* head */
	.snake :global(.Entity:first-child) {
		background-color: #8c9;
	}
	.snake.moving-up :global(.Entity:first-child) {
		border-top-left-radius: 50%;
	}
	.snake.moving-right :global(.Entity:first-child) {
		border-bottom-right-radius: 50%;
	}
	.snake.moving-down :global(.Entity:first-child) {
		border-bottom-right-radius: 50%;
	}
	.snake.moving-left :global(.Entity:first-child) {
		border-bottom-left-radius: 50%;
	}
	:global(.game-fail) .snake :global(.Entity:first-child) {
		background-color: rgb(204, 136, 136);
		border-radius: 5px;
	}
	:global(.game-win) .snake.moving-up :global(.Entity:first-child) {
		border-top-left-radius: 100%;
	}
	:global(.game-win) .snake.moving-right :global(.Entity:first-child) {
		border-bottom-right-radius: 100%;
	}
	:global(.game-win) .snake.moving-down :global(.Entity:first-child) {
		border-bottom-right-radius: 100%;
	}
	:global(.game-win) .snake.moving-left :global(.Entity:first-child) {
		border-bottom-left-radius: 100%;
	}

	/* tail */
	.snake :global(.Entity:last-child) {
		border-radius: 10px;
		background-color: #87c997;
	}
	:global(.game-fail) .snake :global(.Entity:last-child) {
		background-color: #c9878f;
	}

	/* eye */
	.snake :global(.Entity:first-child::after) {
		content: '';
		display: block;
		position: absolute;
		box-sizing: content-box;
		left: 13px;
		top: 3px;
		width: 9px;
		height: 9px;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		border: 4px solid rgba(255, 255, 255, 0.8);
	}
	.snake.moving-up :global(.Entity:first-child::after) {
		border-top-width: 0;
		border-right-width: 2px;
	}
	.snake.moving-right :global(.Entity:first-child::after) {
		border-top-width: 0;
		border-right-width: 2px;
		left: 6px;
	}
	.snake.moving-down :global(.Entity:first-child::after) {
		border-bottom-width: 0;
		border-left-width: 2px;
		left: 6px;
	}
	.snake.moving-left :global(.Entity:first-child::after) {
		border-top-width: 0;
		border-left-width: 2px;
	}
	:global(.game-fail) .snake :global(.Entity:first-child::after) {
		border-width: 4px;
	}
	:global(.game-ready) .snake :global(.Entity:first-child::after) {
		border-width: 3px;
	}
</style>
