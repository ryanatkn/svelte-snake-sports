<script lang="ts">
	import {fade} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let time: number;
	export let bestTime: Writable<number | null>; // TODO don't need to handle `null` here, would need upstream changes
	export let applesToWin: number;

	// TODO doesn't detect if you equal your old score exactly,
	// but that's super unlikely in most cases (though some games may possibly have "perfect" play)

	// These times are in milliseconds with fractional parts,
	// but we only care about whole milliseconds for the UX.
	$: roundedTime = Math.round(time);
	$: roundedBestTime = $bestTime === null ? 0 : Math.round($bestTime);
	$: newHighScore = roundedTime === roundedBestTime;
</script>

<div class="instructions" transition:fade|local>
	<div>you ate all {applesToWin} apples :O</div>
	<div style:position="relative" style:left="{55}px">in <strong>{roundedTime}ms</strong>!</div>
	<div style:position="relative" style:left="{25}px">
		{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {roundedBestTime}ms!{/if}
	</div>
	<div style:position="relative" style:left="{-25}px">
		press <code>r</code> to go again {#if newHighScore}:D{:else}:)){/if}
	</div>
</div>
