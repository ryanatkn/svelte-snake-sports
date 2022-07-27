<svelte:options immutable={false} />

<script lang="ts">
	import type {BenchmarkParams} from '$lib/benchmark';

	export let params: BenchmarkParams;

	const runBenchmark = async (): Promise<void> => {
		console.log('TODO run benchmark');
	};
</script>

<form class="padded-xl">
	<div class="controls padded-xl">
		<button type="button" on:click={runBenchmark}>run benchmark</button>
	</div>
	<label>spawnsPerTick<input type="number" bind:value={params.spawnsPerTick} /></label>
	<label>tickCount<input type="number" bind:value={params.tickCount} /></label>
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
