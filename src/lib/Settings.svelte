<script lang="ts">
	import type SnakeGame from './SnakeGame.svelte';

	export let game: SnakeGame;

	$: ({mapWidth} = game);
</script>

<div class="Settings">
	<label><strong>map width</strong><input type="number" bind:value={mapWidth} /></label>
</div>

<style>
	.Settings {
		font-size: 18px;
		font-weight: 300;
		padding: var(--spacing_xl);
	}
</style>
