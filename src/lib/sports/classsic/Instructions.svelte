<script lang="ts">
	import {fade} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let highScore: Writable<number>;
</script>

<div class="Instructions" transition:fade|local>
	<p>move with arrow keys</p>
	<p style:position="relative" style:left="{-15}px">eat many apples!</p>
	{#if $highScore}
		<p>
			besst is {$highScore} apple{$highScore === 1 ? '' : 's'}!
		</p>
	{/if}
	<p style:position="relative" style:left="{55}px">don't bite yoursself :]</p>
</div>

<style>
	.Instructions {
		position: absolute;
		top: 208px;
		left: 250px;
		font-size: var(--font_size_lg);
	}
</style>
