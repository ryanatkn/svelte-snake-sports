<script lang="ts">
	import type {SnakeGameState} from '$lib/SnakeGameState';

	export let state: SnakeGameState;

	$: ({mapWidth, mapHeight} = state);
</script>

<form class="Settings">
	<label><strong>map width</strong><input type="number" bind:value={mapWidth} /></label>
	<label><strong>map height</strong><input type="number" bind:value={mapHeight} /></label>
</form>

<style>
	.Settings {
		font-size: 18px;
		font-weight: 300;
		padding: var(--spacing_xl);
	}
</style>
