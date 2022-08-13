<script lang="ts">
	import {scale} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let highestClustersEaten: Writable<number>;
</script>

<div class="instructions" transition:scale|local>
	<div>keyboard controls below</div>
	<div style:position="relative" style:left="{-15}px">eat whole bunches of apples!</div>
	{#if $highestClustersEaten}<div>
			besst is {$highestClustersEaten} buncheses{'!'.repeat(($highestClustersEaten / 10) | 0)}
		</div>{/if}
	<div style:position="relative" style:left="{55}px">gotta eat em all</div>
</div>
