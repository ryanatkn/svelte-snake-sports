<svelte:options immutable={false} />

<script lang="ts">
	import Entity from '$lib/Entity.svelte';
	import Tiles from '$lib/renderers/dom/Tiles.svelte';
	import {ENTITY_DEFAULT_HEIGHT, ENTITY_DEFAULT_WIDTH} from '$lib/Entity';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	// TODO maybe rename this module to `SnameGameDomRenderer` or just `Renderer`?

	export let game: SnakeGame;

	$: ({state, movementDirection} = game);
	$: ({mapWidth, mapHeight, apples, snakeSegments} = $state);

	$: mapHeightPx = mapHeight * ENTITY_DEFAULT_HEIGHT;
	$: mapWidthPx = mapWidth * ENTITY_DEFAULT_WIDTH;
</script>

<div class="renderer" style:width="{mapWidthPx}px" style:height="{mapHeightPx}px">
	<div class="layer">
		<Tiles
			{mapWidth}
			{mapHeight}
			tileWidth={ENTITY_DEFAULT_WIDTH}
			tileHeight={ENTITY_DEFAULT_HEIGHT}
		/>
		{#each apples as a (a.id)}
			<Entity entity={a} classes="apple" />
		{/each}
		<div class="snake moving-{$movementDirection}">
			{#each snakeSegments as s (s.id)}
				<Entity entity={s} />
			{/each}
		</div>
		<!-- TODO render the queued movement -->
	</div>
	<slot />
</div>

<style>
	.renderer {
		position: relative;
		display: block;
	}

	.layer {
		position: absolute;
		inset: 0;
	}

	/* TODO fix these global styles to not be global, is a relic of the port */

	.snake :global(.Entity) {
		background-color: #9da;
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

	/* tail */
	.snake :global(.Entity:last-child) {
		border-radius: 10px;
		background-color: #87c997;
	}

	/* eye */
	.snake :global(.Entity:first-child:after) {
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
	.snake.moving-up :global(.Entity:first-child:after) {
		border-top-width: 0;
		border-right-width: 2px;
	}
	.snake.moving-right :global(.Entity:first-child:after) {
		border-top-width: 0;
		border-right-width: 2px;
		left: 6px;
	}
	.snake.moving-down :global(.Entity:first-child:after) {
		border-bottom-width: 0;
		border-left-width: 2px;
		left: 6px;
	}
	.snake.moving-left :global(.Entity:first-child:after) {
		border-top-width: 0;
		border-left-width: 2px;
	}
</style>
