<script lang="ts">
	import type {SnakeGameState} from '$lib/SnakeGameState';

	export let state: SnakeGameState;
	export let tickDuration: number;

	$: ({mapWidth, mapHeight} = state);
</script>

<form class="Settings">
	<label
		><strong>tickDuration</strong><input type="number" bind:value={tickDuration} /><input
			type="range"
			bind:value={tickDuration}
			min={0}
			max={2000}
		/></label
	>
	<!-- TODO how to make these work? need to update state -->
	<label
		><strong>mapWidth</strong><input type="number" bind:value={mapWidth} /><input
			type="range"
			bind:value={mapWidth}
			min={2}
			max={100}
		/></label
	>
	<label
		><strong>mapHeight</strong><input type="number" bind:value={mapHeight} /><input
			type="range"
			bind:value={mapHeight}
			min={2}
			max={100}
		/></label
	>
</form>

<style>
	.Settings {
		font-size: 18px;
		font-weight: 300;
		padding: var(--spacing_xl);
	}
</style>
