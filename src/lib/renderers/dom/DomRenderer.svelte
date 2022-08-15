<script lang="ts">
	import Entity from '$lib/renderers/dom/Entity.svelte';
	import Apple from '$lib/renderers/dom/Apple.svelte';
	import Tiles from '$lib/renderers/dom/Tiles.svelte';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	// TODO maybe rename this module to `SnameGameDomRenderer` or just `Renderer`?

	export let game: SnakeGame;
	export let width: number;
	export let height: number;

	$: ({state, movementDirection} = game);
	$: ({apples, snakeSegments, mapWidth, mapHeight} = $state);

	$: entityWidth = width / mapWidth; // TODO Math.floor?
	$: entityHeight = height / mapHeight;

	export let snakeX = 0; // exposed for binding
	export let snakeY = 0; // exposed for binding
	// TODO BLOCK account for scale
	$: snakeX = entityWidth * snakeSegments[0].x + entityWidth / 2; // centered on the tile
	$: snakeY = entityHeight * snakeSegments[0].y + entityHeight / 2; // centered on the tile
</script>

<div
	class="renderer"
	style:--entity_width="{entityWidth}px"
	style:--entity_height="{entityHeight}px"
>
	<div class="layer">
		<Tiles {mapWidth} {mapHeight} />
		{#each apples as a (a.id)}
			<Apple x={a.x} y={a.y} classes="apple" width={entityWidth} height={entityHeight} />
		{/each}
		<div class="snake moving-{$movementDirection}">
			{#each snakeSegments as s (s.id)}
				<Entity x={s.x} y={s.y} width={entityWidth} height={entityHeight} />
			{/each}
		</div>
		<!-- TODO render the queued movement -->
	</div>
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
		background-color: var(--dim_green);
	}
	:global(.game-fail) .snake :global(.Entity) {
		background-color: var(--dead_red);
	}

	/* head */
	.snake :global(.Entity:first-child) {
		background-color: var(--bright_green);
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
		background-color: var(--bright_dead_red);
		border-radius: 15%;
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
		border-radius: 30%;
		background-color: var(--bright_green);
	}
	:global(.game-fail) .snake :global(.Entity:last-child) {
		background-color: var(--bright_dead_red);
	}

	/* eye */
	.snake :global(.Entity:first-child::after) {
		content: '';
		display: block;
		position: absolute;
		box-sizing: content-box;
		left: 42%;
		top: 10%;
		width: 29%;
		height: 29%;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 15%;
		border: calc((4 / 32) * var(--entity_width)) solid rgba(255, 255, 255, 0.8);
	}
	.snake.moving-up :global(.Entity:first-child::after) {
		border-top-width: 0;
		border-right-width: calc((2 / 32) * var(--entity_width));
	}
	.snake.moving-right :global(.Entity:first-child::after) {
		border-top-width: 0;
		border-right-width: calc((2 / 32) * var(--entity_width));
		left: 19%;
	}
	.snake.moving-down :global(.Entity:first-child::after) {
		border-bottom-width: 0;
		border-left-width: calc((2 / 32) * var(--entity_width));
		left: 19%;
	}
	.snake.moving-left :global(.Entity:first-child::after) {
		border-top-width: 0;
		border-left-width: calc((2 / 32) * var(--entity_width));
	}
	:global(.game-fail) .snake :global(.Entity:first-child::after) {
		border-width: calc((4 / 32) * var(--entity_width));
	}
	:global(.game-ready) .snake :global(.Entity:first-child::after) {
		border-width: calc((3 / 32) * var(--entity_width));
	}
</style>
