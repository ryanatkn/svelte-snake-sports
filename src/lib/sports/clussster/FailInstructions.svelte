<script lang="ts">
	import type {Writable} from 'svelte/store';
	import {scale} from 'svelte/transition';

	export let clustersEaten: number;
	export let highestClustersEaten: Writable<number>;

	$: newHighScore = clustersEaten === $highestClustersEaten;
</script>

<div class="instructions" transition:scale|local>
	<div>
		you ate <strong>{clustersEaten}</strong> cluster{#if clustersEaten !== 1}s{/if}
		{#if clustersEaten < 7}:o{:else}:O{/if}
	</div>
	<div style:position="relative" style:left="{25}px">
		{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {$highestClustersEaten}!{/if}
	</div>
	<div style:position="relative" style:left="{-25}px">
		presss <code>r</code> to go again {#if newHighScore}:D{:else}:)){/if}
	</div>
</div>
