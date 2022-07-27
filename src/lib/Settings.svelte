<script lang="ts">
	import type {SnakeGameState} from '$lib/SnakeGameState';

	export let state: SnakeGameState;
	export let tickDuration: number;

	$: ({mapWidth, mapHeight} = state);
</script>

<form class="Settings">
	<label><strong>mapWidth</strong><input type="number" bind:value={mapWidth} /></label>
	<label><strong>mapHeight</strong><input type="number" bind:value={mapHeight} /></label>
	<label><strong>tickDuration</strong><input type="number" bind:value={tickDuration} /></label>
</form>

<style>
	.Settings {
		font-size: 18px;
		font-weight: 300;
		padding: var(--spacing_xl);
	}
</style>
