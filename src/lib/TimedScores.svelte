<script lang="ts">
	import type {Writable} from 'svelte/store';

	import Score from '$lib/Score.svelte';

	export let applesEaten: number;
	export let applesToWin: number;
	export let currentTime: number;
	export let bestTime: Writable<number | null>;

	$: currentTimeSeconds = Math.floor(currentTime / 1000);
	$: bestTimeSeconds = $bestTime !== null ? Math.floor($bestTime / 1000) : null;
	$: bestTimeMs = $bestTime !== null ? Math.round($bestTime) : null;
</script>

<div class="progress">
	<div class="time" title="current elapsed time">{currentTimeSeconds}s</div>
	<div class="count">
		<Score title="progress towards goal" textBurstKey={applesEaten}>
			<div>{applesEaten}/{applesToWin}</div>
		</Score>
	</div>
	{#if bestTimeSeconds !== null}
		<div class="time" title="best time is {bestTimeMs}ms">{bestTimeSeconds}s</div>
	{/if}
</div>

<style>
	.progress {
		display: flex;
		align-items: center;
		font-size: var(--font_size_xl3);
	}

	.count {
		display: flex;
		align-items: center;
		padding: 0 var(--spacing_lg);
	}

	.time {
		padding: var(--spacing_xl);
	}
</style>
