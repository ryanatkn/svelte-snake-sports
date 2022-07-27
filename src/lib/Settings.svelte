<script lang="ts">
	import type {SnakeGameState} from '$lib/SnakeGameState';

	export let state: SnakeGameState;

	$: ({mapWidth} = state);
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
