<svelte:options immutable={false} />

<script lang="ts">
	import type {Writable} from 'svelte/store';

	import type SnakeGame from '$lib/SnakeGame.svelte';

	export let game: SnakeGame;
	export let baseTickDuration: Writable<number>;
	export let tickDurationDecay: Writable<number>;
	export let tickDurationMin: Writable<number>;
	export let tickDurationMax: Writable<number>;

	$: ({state} = game);
	$: ({mapWidth, mapHeight} = $state);

	// TODO api?
	const clearLocalStorage = () => {
		localStorage.removeItem('highScore');
		localStorage.removeItem('stats');
		window.location = window.location;
	};

	const onMapWidthInput = (e: any) => ($state = {...$state, mapWidth: Number(e.target.value) | 0});
	const onMapHeightInput = (e: any) =>
		($state = {...$state, mapHeight: Number(e.target.value) | 0});

	const MAP_MIN_WIDTH = 2; // tiles
	const MAP_MAX_WIDTH = 100; // tiles
	const MAP_MIN_HEIGHT = 2; // tiles
	const MAP_MAX_HEIGHT = 100; // tiles
	const TICK_DURATION_MIN = 5; // ms
	const TICK_DURATION_MAX = 2000; // ms
</script>

<form class="Settings">
	<section>
		<label
			><strong>baseTickDuration</strong><input
				type="range"
				bind:value={$baseTickDuration}
				min={0}
				max={2000}
			/><input type="number" bind:value={$baseTickDuration} /></label
		>
		<label
			><strong>tickDurationDecay</strong><input
				type="range"
				bind:value={$tickDurationDecay}
				min={0}
				max={1}
				step={0.01}
			/><input type="number" bind:value={$tickDurationDecay} /></label
		>
		<label
			><strong>tickDurationMin</strong><input
				type="range"
				bind:value={$tickDurationMin}
				min={TICK_DURATION_MIN}
				max={TICK_DURATION_MAX}
			/><input type="number" bind:value={$tickDurationMin} /></label
		>
		<label
			><strong>tickDurationMax</strong><input
				type="range"
				bind:value={$tickDurationMax}
				min={TICK_DURATION_MIN}
				max={TICK_DURATION_MAX}
			/><input type="number" bind:value={$tickDurationMax} /></label
		>
		<!-- TODO how to make these work? need to update state -->
		<label
			><strong>mapWidth</strong><input
				type="range"
				value={mapWidth}
				on:input={onMapWidthInput}
				min={MAP_MIN_WIDTH}
				max={MAP_MAX_WIDTH}
				step={1}
			/><input
				type="number"
				value={mapWidth}
				on:input={onMapWidthInput}
				min={MAP_MIN_WIDTH}
				max={MAP_MAX_WIDTH}
			/></label
		>
		<label
			><strong>mapHeight</strong><input
				type="range"
				value={mapHeight}
				on:input={onMapHeightInput}
				min={MAP_MIN_HEIGHT}
				max={MAP_MAX_HEIGHT}
				step={1}
			/><input
				type="number"
				value={mapHeight}
				on:input={onMapHeightInput}
				min={MAP_MIN_HEIGHT}
				max={MAP_MAX_HEIGHT}
			/></label
		>
	</section>
	<section>
		<button
			type="button"
			on:click={() => {
				// eslint-disable-next-line no-alert
				if (confirm('clear all saved data?')) {
					clearLocalStorage();
				}
			}}>reset saved data</button
		>
	</section>
</form>

<style>
	.Settings {
		font-size: 18px;
		font-weight: 300;
		padding: var(--spacing_xl);
	}
	section {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
