<svelte:options immutable={false} />

<script lang="ts">
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	export let state: SnakeGameState;
	export let game: SnakeGame;

	$: ({mapWidth, mapHeight} = state);
	$: ({baseTickDuration} = game);

	// TODO api?
	const clearLocalStorage = () => {
		localStorage.removeItem('highScore');
		localStorage.removeItem('stats');
		window.location = window.location;
	};
</script>

<form class="Settings">
	<label
		><strong>baseTickDuration</strong><input
			type="range"
			bind:value={$baseTickDuration}
			min={0}
			max={2000}
		/><input type="number" bind:value={$baseTickDuration} /></label
	>
	<!-- TODO how to make these work? need to update state -->
	<label class="TODO"
		><strong>mapWidth</strong><input type="range" bind:value={mapWidth} min={2} max={100} /><input
			type="number"
			bind:value={mapWidth}
		/></label
	>
	<label class="TODO"
		><strong>mapHeight</strong><input type="range" bind:value={mapHeight} min={2} max={100} /><input
			type="number"
			bind:value={mapHeight}
		/></label
	>
	<button
		type="button"
		on:click={() => {
			// eslint-disable-next-line no-alert
			if (confirm('clear all saved data?')) {
				clearLocalStorage();
			}
		}}>reset saved data</button
	>
</form>

<style>
	.Settings {
		font-size: 18px;
		font-weight: 300;
		padding: var(--spacing_xl);
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
	}
	.TODO {
		display: none;
	}
</style>
