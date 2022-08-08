<script lang="ts">
	import {scale} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let highestApplesEaten: Writable<number>;
</script>

<div class="instructions" transition:scale|local>
	<div>move with arrow keys</div>
	<div style:position="relative" style:left="{-15}px">eat apple clusssters!</div>
	{#if $highestApplesEaten}<div>
			besst is {$highestApplesEaten} apple{$highestApplesEaten === 1 ? '' : 's'}{'!'.repeat(
				($highestApplesEaten / 10) | 0,
			)}
		</div>{/if}
	<div style:position="relative" style:left="{55}px">gotta eat em all</div>
</div>
