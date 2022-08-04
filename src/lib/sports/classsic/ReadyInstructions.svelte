<script lang="ts">
	import {fade} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let highScore: Writable<number>;
</script>

<div class="instructions" transition:fade|local>
	<div>move with arrow keys</div>
	<div style:position="relative" style:left="{-15}px">eat many apples!</div>
	{#if $highScore}<div>
			besst is {$highScore} apple{$highScore === 1 ? '' : 's'}{'!'.repeat(($highScore / 10) | 0)}
		</div>{/if}
	<div style:position="relative" style:left="{55}px">don't bite yoursself :]</div>
</div>
