<script lang="ts">
	import {unwrap} from '@feltcoop/felt';
	import {scale as scaleTransition} from 'svelte/transition';
	import {randomItem} from '@feltcoop/felt/util/random.js';
	import {plural} from '@feltcoop/felt/util/string.js';
	import {onDestroy} from 'svelte';
	import Dialog from '@feltcoop/felt/ui/dialog/Dialog.svelte';

	import Positioned from '$lib/Positioned.svelte';
	import BenchmarkCreator from '$lib/BenchmarkCreator.svelte';
	import BenchmarkRunner from '$lib/BenchmarkRunner.svelte';
	import type {BenchmarkOutput, BenchmarkParams} from '$lib/benchmark';
	import type {Clock} from '$lib/clock';

	// TODO fix

	interface Sss {
		icon: string;
	}

	const items: Sss[] = unwrap({
		ok: true,
		value: [{icon: '🐍'}],
	});

	export let ssses = [items[0]];
	export let clock: Clock;
	export let song: HTMLAudioElement | undefined;
	export let benchmarks: BenchmarkOutput[] = [];

	const sss = (): void => {
		ssses = [{...randomItem(items)!}].concat(ssses);
	};
	const reset = (): void => {
		ssses = [];
	};

	let layoutItems: LayoutItem[];
	$: layoutItems = clientWidth === undefined ? [] : toLayout(ssses, clientWidth);

	interface LayoutItem {
		index: number;
		x: number;
		y: number;
		scale: number;
		row: number;
		column: number;
		sss: Sss;
		fontSize: number;
	}

	const COLUMN_COUNT = 5;

	// TODO tweened x/y?
	const toLayout = (ssses: Sss[], width: number): LayoutItem[] => {
		const columnWidth = Math.floor(width / COLUMN_COUNT);
		const ROW_HEIGHT = columnWidth;
		return ssses.map((sss, i): LayoutItem => {
			const row = Math.floor(i / COLUMN_COUNT);
			const flowsLeft = row % 2 === 1;
			const column = flowsLeft ? COLUMN_COUNT - 1 - (i % COLUMN_COUNT) : i % COLUMN_COUNT;
			return {
				index: i,
				x: column * columnWidth,
				y: row * ROW_HEIGHT,
				row,
				column,
				scale: 1,
				sss,
				fontSize: columnWidth * 0.85,
			};
		});
	};

	// TODO BLOCK instead of pausing immediately, pause after a cooldown that's reset when play is started again,
	// so it't not choppy unless you go more than a second between them

	$: inputEnabled = !runningBenchmark;

	const SSS_TIMER = 1000;
	const PAUSE_TIMER = SSS_TIMER * 1.2 + 33;
	let playing = false;
	$: if (song) {
		if (playing) {
			startPlaying(song);
		} else {
			stopPlaying(song);
		}
	}
	let sssInterval: NodeJS.Timer | undefined;
	let pauseTimeout: NodeJS.Timeout | undefined;
	const startPlaying = (song: HTMLAudioElement) => {
		queueSssInterval();
		clearPauseTimeout();
		void song.play();
	};
	const stopPlaying = (song: HTMLAudioElement | undefined, immediately = false) => {
		clearSssInterval();
		if (song) {
			if (immediately) {
				clearPauseTimeout();
				song.pause();
			} else {
				pauseTimeout = setTimeout(() => song.pause(), PAUSE_TIMER);
			}
		}
	};
	const queueSssInterval = () => {
		if (sssInterval) return;
		sssInterval = setInterval(() => {
			sss();
		}, SSS_TIMER);
	};
	const clearSssInterval = () => {
		clearInterval(sssInterval);
		sssInterval = undefined;
	};
	const clearPauseTimeout = () => {
		clearTimeout(pauseTimeout);
		pauseTimeout = undefined;
	};
	const onMousedown = () => {
		if (!inputEnabled) return;
		sss();
		playing = true;
	};
	const onClick = () => {
		if (!inputEnabled) return;
		sss();
	};
	const onMouseup = () => {
		if (!inputEnabled) return;
		playing = false;
	};
	const onMouseleave = () => {
		if (!inputEnabled) return;
		playing = false;
	};
	const onKeydown = (e: KeyboardEvent) => {
		if (!inputEnabled) return;
		if (e.key === ' ' || e.key === 'Enter') {
			playing = true;
		}
	};
	const onKeyup = (e: KeyboardEvent) => {
		if (!inputEnabled) return;
		if (e.key === ' ' || e.key === 'Enter') {
			playing = false;
		}
	};
	onDestroy(() => {
		stopPlaying(song, true);
	});

	let clientWidth: number;

	let showBenchmarkDialog = false;
	let runningBenchmark: BenchmarkParams | undefined;
	const closeBenchmark = () => (showBenchmarkDialog = false);
	const openBenchmark = () => (showBenchmarkDialog = true);
	const benchmarkerParams: BenchmarkParams = {tickCount: 100, spawnsPerTick: 1};
	const runBenchmark = (params: BenchmarkParams): void => {
		showBenchmarkDialog = false;
		runningBenchmark = params;
		clock.resume();
		console.log(`params`, params);
	};
	const finishBenchmark = (output: BenchmarkOutput): void => {
		console.log(`benchmark output`, output);
		runningBenchmark = undefined;
		benchmarks = benchmarks.concat(output);
	};
	const updateBenchmark = (_tick: number): void => {
		if (!runningBenchmark) return;
		const {spawnsPerTick} = runningBenchmark;
		for (let i = 0; i < spawnsPerTick; i++) {
			sss();
		}
	};
</script>

<div class="panel-outset padded-md centered-hz">
	<button
		on:click={() => (layoutItems.length ? reset() : openBenchmark())}
		title="do snake magic to {layoutItems.length} snake{plural(layoutItems.length)}"
		>{#if layoutItems.length}🪄{:else}⏱{/if}</button
	>
	<span class="padded-md">{layoutItems.length}</span>
</div>
{#if showBenchmarkDialog}
	<Dialog on:close={() => closeBenchmark()}>
		<BenchmarkCreator params={benchmarkerParams} on:create={(e) => runBenchmark(e.detail)} />
		<div>
			{#each benchmarks as benchmark}
				<div class="centered-hz">
					{JSON.stringify(benchmark)}<button on:click={() => runBenchmark(benchmark.params)}
						>rerun</button
					>
				</div>
			{/each}
		</div>
	</Dialog>
{/if}
{#if runningBenchmark}
	<BenchmarkRunner
		{clock}
		params={benchmarkerParams}
		on:tick={(e) => updateBenchmark(e.detail)}
		on:finish={(e) => finishBenchmark(e.detail)}
	/>
{/if}
<button
	class="sss"
	disabled={!inputEnabled}
	on:mousedown={onMousedown}
	on:mouseup={onMouseup}
	on:click={onClick}
	on:mouseleave={onMouseleave}
	on:mouseleave={onMouseleave}
	on:keydown={onKeydown}
	on:keyup={onKeyup}
>
	sss
</button>
<div class="snakes" bind:clientWidth>
	{#each layoutItems as item, i (item.sss)}<Positioned
			x={item.x}
			y={item.y}
			scale={item.scale + Math.cos(i) / 3.5}
			rotate="{Math.cos(i) * -23}deg"
			><div
				in:scaleTransition={{duration: 1000}}
				style:font-size="{item.fontSize}px"
				style:filter="hue-rotate({i * 23}deg)"
			>
				{item.sss.icon}
			</div></Positioned
		>{/each}
</div>

<style>
	.snakes {
		position: relative;
		width: 100%;
	}
	.sss {
		font-size: var(--font_size_xl5);
		font-weight: 300;
		text-transform: uppercase;
	}
	span {
		font-size: var(--font_size_xl);
	}
</style>
