<script lang="ts">
	import {fade} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let time: number;
	export let bestTime: Writable<number | null>; // TODO don't need to handle `null` here, would need upstream changes
	export let applesToWin: number;

	// These times are in milliseconds with fractional parts,
	// but we only care about whole milliseconds for the UX.
	$: roundedTime = Math.round(time);
	$: roundedBestTime = $bestTime === null ? 0 : Math.round($bestTime);
</script>

<div class="instructions" transition:fade|local>
	<div>you ate all {applesToWin} apples :O</div>
	<div style:position="relative" style:left="{55}px">in <strong>{roundedTime}ms</strong>!</div>
	<div style:position="relative" style:left="{25}px">
		{#if roundedBestTime > roundedTime}besst is {roundedBestTime}ms!{:else}<strong
				>a new high score!!</strong
			>{/if}
	</div>
	<div style:position="relative" style:left="{-25}px">press <code>r</code> to go again :D</div>
</div>
