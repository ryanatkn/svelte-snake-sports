<svelte:options immutable={false} />

<script lang="ts">
	import Entity from '$lib/Entity.svelte';
	import Instructions from '$lib/Instructions.svelte';
	import {ENTITY_DEFAULT_HEIGHT, ENTITY_DEFAULT_WIDTH} from '$lib/Entity';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	export let game: SnakeGame;

	$: ({state} = game);
	$: ({mapWidth, mapHeight, tiles, apples, snakeSegments, score} = $state);

	$: mapHeightPx = mapHeight * ENTITY_DEFAULT_HEIGHT;
	$: mapWidthPx = mapWidth * ENTITY_DEFAULT_WIDTH;
</script>

<div class="Renderer" style:width="{mapWidthPx}px" style:height="{mapHeightPx}px">
	<ul class="Renderer-entities Renderer-layer">
		<ul class="Renderer-tiles Renderer-layer">
			{#each tiles as t (t.id)}
				<Entity entity={t} />
			{/each}
		</ul>
		<ul class="Renderer-apples Renderer-layer">
			{#each apples as a (a.id)}
				<Entity entity={a} />
			{/each}
		</ul>
		<ul class="Renderer-snake Renderer-layer">
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
	.Renderer {
		position: relative;
		display: block;
	}

	.Renderer-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	/* TODO fix these global styles to not be global, is a relic of the port */
	.Renderer-tiles :global(.Entity) {
		background-color: #f7f1f1;
	}

	.Renderer-apples :global(.Entity) {
		background-color: #c89;
		border-radius: 17px 14px 12px 10px;
		animation: pop-in 0.66s ease-in-out;
	}

	.Renderer-apples :global(.Entity:after) {
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

	.Renderer-snake :global(.Entity) {
		background-color: #9da;
	}
	.Renderer-snake :global(.Entity:first-child) {
		background-color: #8c9;
	}
	.Renderer-snake :global(.Entity:last-child) {
		background-color: #97d7a7;
	}

	.Renderer-snake :global(.Entity:first-child:after) {
		content: '';
		display: block;
		position: absolute;
		box-sizing: content-box;
		left: 13px;
		top: 13px;
		width: 5px;
		height: 5px;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		border: 4px solid rgba(255, 255, 255, 0.8);
		border-top-width: 2px;
		border-right-width: 3px;
	}

	.Renderer-snake :global(.Entity:last-child) {
		border-radius: 4px 7px 10px 7px;
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
.Renderer-entities {}
.Renderer-tiles {}
.Renderer-apples {}
.Renderer-snake {}*/
</style>
