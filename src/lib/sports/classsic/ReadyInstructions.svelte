<script lang="ts">
	import {scale} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let highestApplesEaten: Writable<number>;
</script>

<div class="instructions" transition:scale|local>
	<div>keyboard controls below</div>
	<div style:position="relative" style:left="{-15}px">eat many apples!</div>
	{#if $highestApplesEaten}<div>
			besst is {$highestApplesEaten} apple{$highestApplesEaten === 1 ? '' : 's'}{'!'.repeat(
				($highestApplesEaten / 10) | 0,
			)}
		</div>{/if}
	<div style:position="relative" style:left="{55}px">don't bite yoursself :]</div>
</div>
