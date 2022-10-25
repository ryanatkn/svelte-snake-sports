<script lang="ts">
	import type {Writable} from 'svelte/store';

	import TimedScores from '$lib/TimedScores.svelte';
	import EatenScores from '$lib/EatenScores.svelte';

	// TODO rename this module

	export let applesEaten: number;
	export let highestApplesEaten: number | null;
	export let applesToWin: number;
	export let currentTime: number;
	export let bestTime: number | null;
	export let rendererWidth: Writable<number>;

	let winType: 'time' | 'applesEaten';
	$: winType = highestApplesEaten || applesEaten > applesToWin ? 'applesEaten' : 'time';
</script>

{#if winType === 'applesEaten'}
	<EatenScores {applesEaten} {highestApplesEaten} />
{:else}
	<TimedScores {applesEaten} {applesToWin} {currentTime} {bestTime} {rendererWidth} />
{/if}
