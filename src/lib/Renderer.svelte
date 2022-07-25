<script lang="ts">
	import Score from './Score.svelte';
	import Entity from './Entity.svelte';
	import Instructions from './Instructions.svelte';
	import type {GameState} from '../models/GameState';

	export let game: GameState;
</script>

<div class="Renderer" style:width="{game.mapWidthPx}px" style:height="{game.mapHeightPx}px">
	<ul class="Renderer-entities Renderer-layer">
		<ul class="Renderer-tiles Renderer-layer">
			{#each game.tiles as t (t.id)}
				<Entity entity={t} />
			{/each}
		</ul>
		<ul class="Renderer-apples Renderer-layer">
			{#each game.apples as a (a.id)}
				<Entity entity={a} />
			{/each}
		</ul>
		<ul class="Renderer-snake Renderer-layer">
			{#each game.snake.segments as s (s.id)}
				<Entity entity={s} />
			{/each}
		</ul>
	</ul>
	<Score score={game.score} />
	{#if game.score === 0}
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
		left: 13px;
		top: 13px;
		width: 3px;
		height: 3px;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		border: 3px solid rgba(255, 255, 255, 0.8);
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
