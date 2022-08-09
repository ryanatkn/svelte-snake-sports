<script lang="ts">
	import type {Writable} from 'svelte/store';
	import {scale} from 'svelte/transition';

	export let bunchesEaten: number;
	export let highestClustersEaten: Writable<number>;

	$: newHighScore = bunchesEaten === $highestClustersEaten;
</script>

<div class="instructions" transition:scale|local>
	<div>
		you ate <strong>{bunchesEaten}</strong> bunch{#if bunchesEaten !== 1}es{/if}
		{#if bunchesEaten < 7}:o{:else}:O{/if}
	</div>
	<div style:position="relative" style:left="{25}px">
		{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {$highestClustersEaten}!{/if}
	</div>
	<div style:position="relative" style:left="{-25}px">
		presss <code>r</code> to go again {#if newHighScore}:D{:else}:)){/if}
	</div>
</div>
