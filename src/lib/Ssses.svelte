<script lang="ts">
	import {unwrap} from '@feltcoop/felt';
	import {randomItem} from '@feltcoop/felt/util/random.js';

	import Positioned from '$lib/Positioned.svelte';

	interface Sss {
		icon: string;
	}

	const items: Sss[] = unwrap({
		ok: true,
		value: [{icon: '🐍'}],
	});

	export let ssses = [items[0]];

	const sss = (): void => {
		ssses = [{...randomItem(items)!}].concat(ssses);
	};

	let layout: LayoutItem[];
	$: layout = clientWidth === undefined ? [] : toLayout(ssses, clientWidth);

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

	let clientWidth: number;
</script>

<button on:click={sss}> sss </button>
<div class="ssses" bind:clientWidth>
	{#each layout as item, i (item.sss)}<Positioned
			x={item.x}
			y={item.y}
			scale={item.scale + Math.cos(i) / 3.5}
			><span style:font-size="{item.fontSize}px" style:filter="hue-rotate({i * 23}deg)"
				>{item.sss.icon}</span
			></Positioned
		>{/each}
</div>

<style>
	.ssses {
		position: relative;
		width: 100%;
	}
</style>
