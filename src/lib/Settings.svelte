<script lang="ts">
	import type {Writable} from 'svelte/store';

	import type SnakeGame from '$lib/SnakeGame.svelte';
	import {CLASSSIC_HIGH_SCORE_KEY} from '$lib/sports/classsic/ClasssicSnake.svelte';
	import {SSSPEED_HIGH_SCORE_KEY} from '$lib/sports/ssspeed/SsspeedSnake.svelte';
	import {BUNCHESES_HIGH_SCORE_KEY} from '$lib/sports/buncheses/BunchesesSnake.svelte';

	export let game: SnakeGame;
	export let baseTickDuration: Writable<number>;
	export let tickDurationDecay: Writable<number>;
	export let tickDurationMin: Writable<number>;
	export let tickDurationMax: Writable<number>;
	export let rendererWidth: Writable<number>;
	export let rendererHeight: Writable<number>;

	game; // TODO adjustable map height

	// $: ({state} = game);
	// $: ({mapWidth, mapHeight} = $state);

	// TODO api?
	const clearLocalStorage = () => {
		localStorage.removeItem(CLASSSIC_HIGH_SCORE_KEY);
		localStorage.removeItem(SSSPEED_HIGH_SCORE_KEY);
		localStorage.removeItem(BUNCHESES_HIGH_SCORE_KEY);
		window.location = window.location;
	};

	// const MAP_MIN_WIDTH = 2; // tiles
	// const MAP_MAX_WIDTH = 100; // tiles
	// const MAP_MIN_HEIGHT = 2; // tiles
	// const MAP_MAX_HEIGHT = 100; // tiles

	// const onMapWidthInput = (e: any) => ($state = {...$state, mapWidth: Number(e.target.value) | 0});
	// const onMapHeightInput = (e: any) =>
	// 	($state = {...$state, mapHeight: Number(e.target.value) | 0});

	const RENDERER_MIN_WIDTH = 10; // px
	const RENDERER_MAX_WIDTH = 5000; // px
	const RENDERER_MIN_HEIGHT = 10; // px
	const RENDERER_MAX_HEIGHT = 5000; // px

	const onRendererWidthInput = (e: any) => ($rendererWidth = Number(e.target.value) | 0);
	const onRendererHeightInput = (e: any) => ($rendererHeight = Number(e.target.value) | 0);

	const TICK_DURATION_MIN = 5; // ms
	const TICK_DURATION_MAX = 2000; // ms
</script>

<form class="Settings">
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
		<section>
			<!-- <label
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
			> -->
			<label
				><strong>rendererWidth</strong><input
					type="range"
					value={$rendererWidth}
					on:input={onRendererWidthInput}
					min={RENDERER_MIN_WIDTH}
					max={RENDERER_MAX_WIDTH}
					step={1}
				/><input
					type="number"
					value={$rendererWidth}
					on:input={onRendererWidthInput}
					min={RENDERER_MIN_WIDTH}
					max={RENDERER_MAX_WIDTH}
				/></label
			>
			<label
				><strong>rendererHeight</strong><input
					type="range"
					value={$rendererHeight}
					on:input={onRendererHeightInput}
					min={RENDERER_MIN_HEIGHT}
					max={RENDERER_MAX_HEIGHT}
					step={1}
				/><input
					type="number"
					value={$rendererHeight}
					on:input={onRendererHeightInput}
					min={RENDERER_MIN_HEIGHT}
					max={RENDERER_MAX_HEIGHT}
				/></label
			>
		</section>
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
