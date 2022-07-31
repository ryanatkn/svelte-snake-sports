<svelte:options immutable={false} />

<script lang="ts">
	import Entity from '$lib/Entity.svelte';
	import Instructions from '$lib/Instructions.svelte';
	import Tiles from '$lib/renderers/dom/Tiles.svelte';
	import {ENTITY_DEFAULT_HEIGHT, ENTITY_DEFAULT_WIDTH} from '$lib/Entity';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	// TODO maybe rename this module to `SnameGameDomRenderer`?

	export let game: SnakeGame;

	$: ({state, snakeMovementDirection} = game);
	$: ({mapWidth, mapHeight, apples, snakeSegments, score} = $state);

	$: mapHeightPx = mapHeight * ENTITY_DEFAULT_HEIGHT;
	$: mapWidthPx = mapWidth * ENTITY_DEFAULT_WIDTH;
</script>

<div class="renderer" style:width="{mapWidthPx}px" style:height="{mapHeightPx}px">
	<ul class="entities layer">
		<ul class="tiles layer">
			<Tiles width={mapWidth} height={mapHeight} />
		</ul>
		<ul class="apples layer">
			{#each apples as a (a.id)}
				<Entity entity={a} />
			{/each}
		</ul>
		<ul class="snake layer moving-{$snakeMovementDirection}">
			{#each snakeSegments as s (s.id)}
				<Entity entity={s} />
			{/each}
		</ul>
		<!-- TODO render the queued movement -->
	</ul>
	{#if score === 0}
		<Instructions {game} />
	{/if}
</div>

<style>
	.renderer {
		position: relative;
		display: block;
	}

	.layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	/* TODO fix these global styles to not be global, is a relic of the port */
	.tiles :global(.Entity) {
		background-color: #f7f1f1;
	}

	.apples :global(.Entity) {
		background-color: #c89;
		border-radius: 17px 14px 12px 10px;
		animation: pop-in 0.66s ease-in-out;
	}

	.apples :global(.Entity:after) {
		content: '';
		display: block;
		position: absolute;
		left: 13px;
		top: -3px;
		width: 3px;
		height: 7px;
		background-color: rgba(122, 100, 100, 0.8);
		border-radius: 4px;
	}

	.snake :global(.Entity) {
		background-color: #9da;
	}
	.snake :global(.Entity:first-child) {
		background-color: #8c9;
	}
	.snake :global(.Entity:last-child) {
		background-color: #87c997;
	}

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

	.snake :global(.Entity:last-child) {
		border-radius: 10px;
	}

	@keyframes pop-in {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	/* TODO turn these into components? Discard completely? They're helpful as documentation.
.entities {}
.tiles {}
.apples {}
.snake {}*/
</style>
