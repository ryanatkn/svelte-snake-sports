<script lang="ts">
	import {fade} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let bestTime: Writable<number | null>;
	export let applesToWin: number;
</script>

<div class="Instructions" transition:fade|local>
	<p>move with arrow keys</p>
	<p style:position="relative" style:left="{-15}px">eat {applesToWin} apples asap!</p>
	{#if $bestTime}
		<p>
			besst is {$bestTime}ms!
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
