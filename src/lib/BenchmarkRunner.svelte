<svelte:options immutable={false} />

<script lang="ts">
	import {onMount, createEventDispatcher} from 'svelte';
	import type {BenchmarkOutput, BenchmarkParams} from '$lib/benchmark';
	import type {Clock} from './clock';

	const dispatch = createEventDispatcher<{tick: number; finish: BenchmarkOutput}>();

	export let clock: Clock;
	export let params: BenchmarkParams;
	export let output: BenchmarkOutput | undefined = undefined;

	let tick = 0;

	let spawns = 0;

	let runningBenchmark = false;
	$: runningBenchmark && $clock.running && updateBenchmark($clock.dt);
	const updateBenchmark = (dt: number): void => {
		output = {params, totalTime: output ? output.totalTime + dt : dt};
		tick++;
		spawns += params.spawnsPerTick; // allows partials
		while (spawns >= 1) {
			spawns--;
			dispatch('tick', tick); // TODO should be a `spawn` event right? or rather `ticksPerMs`
		}
		if (tick >= output.params.tickCount) {
			runningBenchmark = false;
			dispatch('finish', output);
		}
	};

	onMount(async () => {
		runBenchmark();
	});

	const runBenchmark = (): void => {
		tick = 0;
		const {tickCount} = params;
		output = {params, totalTime: 0};
		console.log(`Benchmark Runner params`, params);
		console.log(`tickCount`, tickCount);
		runningBenchmark = true;
	};
</script>
