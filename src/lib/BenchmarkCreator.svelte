<svelte:options immutable={false} />

<script lang="ts">
	import type {BenchmarkParams} from '$lib/benchmark';
	import {createEventDispatcher} from 'svelte';
	import type {Renderer} from '$lib/renderer';

	const dispatch = createEventDispatcher<{create: BenchmarkParams}>();

	export let params: BenchmarkParams;
	export let renderers: Renderer[];

	const runBenchmark = async (): Promise<void> => {
		dispatch('create', params);
	};

	// TODO refactor
	let _renderer = params.renderer;
	$: if (_renderer !== params.renderer) params = {...params, renderer: _renderer};
	let _spawnsPerTick = params.spawnsPerTick;
	$: if (_spawnsPerTick !== params.spawnsPerTick)
		params = {...params, spawnsPerTick: _spawnsPerTick};
	let _tickCount = params.tickCount;
	$: if (_tickCount !== params.tickCount) params = {...params, tickCount: _tickCount};
</script>

<form class="padded-xl">
	<div class="controls padded-xl">
		<button type="button" on:click={runBenchmark}>run benchmark</button>
	</div>
	<label
		>renderer<select bind:value={_renderer}>
			{#each renderers as renderer}
				<option value={renderer.name}>
					{renderer.name}
				</option>
			{/each}
		</select></label
	>
	<label>spawnsPerTick<input type="number" bind:value={_spawnsPerTick} /></label>
	<label>tickCount<input type="number" bind:value={_tickCount} /></label>
</form>

<style>
	label {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-weight: bold;
		margin-bottom: var(--spacing_xl);
	}
	label:last-child {
		margin: 0;
	}
</style>
