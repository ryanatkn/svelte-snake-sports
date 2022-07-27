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

	let runningBenchmark = false;
	$: runningBenchmark && $clock.running && updateBenchmark($clock.dt);
	const updateBenchmark = (dt: number): void => {
		console.log(`dt`, dt);
		output = {params, totalTime: output ? output.totalTime + dt : dt};
		tick++;
		for (let i = 0; i < params.spawnsPerTick; i++) {
			// TODO support a fn?
			dispatch('tick', tick);
		}
		if (tick > output.params.tickCount) {
			runningBenchmark = false;
			console.log(`output`, output);
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
