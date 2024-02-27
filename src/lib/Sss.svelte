<script lang="ts">
	import {random_item} from '@ryanatkn/belt/random.js';
	import {plural} from '@ryanatkn/belt/string.js';
	import {onDestroy} from 'svelte';
	import {scale} from 'svelte/transition';

	import Positioned from '$lib/Positioned.svelte';

	interface Sss {
		icon: string;
	}
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

	const items: Sss[] = [{icon: '🐍'}];

	export let ssses = [items[0]];
	export let song: HTMLAudioElement | undefined;

	const sss = (): void => {
		ssses = [{...random_item(items)}].concat(ssses);
	};
	const reset = (): void => {
		ssses = [];
	};

	let layoutItems: LayoutItem[];
	$: layoutItems = clientWidth === undefined ? [] : toLayout(ssses, clientWidth);

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

	// TODO  instead of pausing immediately, pause after a cooldown that's reset when play is started again,
	// so it't not choppy unless you go more than a second between them

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
	let sssInterval: number | undefined;
	let pauseTimeout: number | undefined;
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
		sss();
		playing = true;
	};
	const onClick = () => {
		sss();
	};
	const onMouseup = () => {
		playing = false;
	};
	const onMouseleave = () => {
		playing = false;
	};
	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === ' ' || e.key === 'Enter') {
			playing = true;
		}
	};
	const onKeyup = (e: KeyboardEvent) => {
		if (e.key === ' ' || e.key === 'Enter') {
			playing = false;
		}
	};
	onDestroy(() => {
		stopPlaying(song, true);
	});

	let clientWidth: number;
</script>

<button
	class="sss"
	on:mousedown={onMousedown}
	on:mouseup={onMouseup}
	on:click={onClick}
	on:mouseleave={onMouseleave}
	on:keydown={onKeydown}
	on:keyup={onKeyup}
>
	sss
</button>
<button
	on:click={reset}
	disabled={!layoutItems.length}
	title="do snake magic to {layoutItems.length} snake{plural(layoutItems.length)}"
	>{layoutItems.length}</button
>
<div class="snakes" bind:clientWidth>
	{#each layoutItems as item, i (item.sss)}
		<Positioned
			x={item.x}
			y={item.y}
			scale={item.scale + Math.cos(i) / 3.5}
			rotate="{Math.cos(i) * -23}deg"
			><div
				in:scale={{duration: 1000}}
				style:font-size="{item.fontSize}px"
				style:filter="hue-rotate({i * 23}deg)"
			>
				{item.sss.icon}
			</div>
		</Positioned>
	{/each}
</div>

<style>
	.snakes {
		position: relative;
		width: 100%;
		margin-bottom: 1000px;
	}

	.sss {
		font-size: var(--size_xl5);
		font-weight: 300;
		text-transform: uppercase;
	}
</style>
