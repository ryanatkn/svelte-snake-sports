<script lang="ts">
	import type {Writable} from 'svelte/store';
	import {scale} from 'svelte/transition';

	import RestartInstructions from '$lib/RestartInstructions.svelte';

	export let bunchesEaten: number;
	export let highestClustersEaten: Writable<number>;
	export let restart: () => void;

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
	<RestartInstructions {restart}>
		{#if newHighScore}:D{:else}:)){/if}
	</RestartInstructions>
	<slot />
</div>
