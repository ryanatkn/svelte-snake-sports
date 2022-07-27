<script lang="ts">
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import Fps from '$lib/Fps.svelte';

	export let state: SnakeGameState;

	$: ({stats, highScore} = state);

	let fps = 0; // TODO BLOCK probably add an `Fps.svelte` that uses the clock and exports its value for binding
</script>

<ul class="Stats">
	<li>
		<div class="value">{stats}</div>
		lives
	</li>
	<li>
		<div class="value">{fps}</div>
		fps
	</li>
	<li>
		<div class="value">{highScore}</div>
		high score
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
