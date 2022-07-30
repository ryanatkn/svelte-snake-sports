<script lang="ts">
	import Fps from '$lib/Fps.svelte';
	import type {ISnakeGame} from '$lib/SnakeGame';

	export let game: ISnakeGame;

	$: ({runCount, highScore, currentTickDuration} = game);

	let fps: number;

	$: framesPerTurn = fps && Math.floor($currentTickDuration / (1000 / fps));
</script>

<ul class="Stats">
	<li>
		<div class="value">{$highScore}</div>
		besst
	</li>
	<li>
		<div class="value">{$runCount}</div>
		lives
	</li>
	<li>
		<div class="value">{$currentTickDuration}</div>
		ms per turn
	</li>
	<li>
		<div class="value">{fps ?? '??'}</div>
		fps
	</li>
	<li>
		<div class="value">{framesPerTurn ?? '??'}</div>
		frames per turn
	</li>
</ul>
<Fps bind:fps />

<style>
	.Stats {
		display: flex;
		flex-direction: row;
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--spacing_md);
	}

	.value {
		padding: 0 5px;
		font-size: var(--font_size_xl);
	}
</style>
