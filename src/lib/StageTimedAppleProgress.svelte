<script lang="ts">
	import type {Writable} from 'svelte/store';

	export let applesEaten: number;
	export let applesToWin: number;
	export let currentTime: number;
	export let bestTime: Writable<number | null>;

	$: currentTimeSeconds = Math.floor(currentTime / 1000);
	$: bestTimeSeconds = $bestTime !== null ? Math.floor($bestTime / 1000) : null;
</script>

<div class="progress">
	<div class="time" title="current elapsed time in seconds">{currentTimeSeconds}s</div>
	<div class="count" title="progress towards goal">
		<div>{applesEaten}/{applesToWin}</div>
		<div class="apple" />
	</div>
	{#if bestTimeSeconds !== null}
		<div class="time" title="best elapsed time in seconds">best: {bestTimeSeconds}s</div>
	{/if}
</div>

<style>
	.progress {
		display: flex;
		padding: var(--spacing_xl);
		align-items: center;
		font-size: var(--font_size_xl3);
	}

	.count {
		display: flex;
		align-items: center;
		padding: 0 var(--spacing_lg);
	}
	.apple {
		margin-left: var(--spacing_xl);
	}

	.time {
		margin-right: var(--spacing_xl3);
	}
</style>
