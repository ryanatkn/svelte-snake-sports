<script lang="ts">
	import type {Direction} from '$lib/direction';
	import type {Writable} from 'svelte/store';

	export let movementCommandQueue: Writable<Direction[]>;

	// TODO BLOCK always render all 4, and show ... at the top only if 0
</script>

<ul>
	{#each $movementCommandQueue as direction}
		<li>> {direction}</li>
	{:else}
		<li>> ...</li>
	{/each}
</ul>

<style>
	ul {
		white-space: nowrap;
		width: 6rem;
		font-weight: 700;
		color: var(--brown_text_color);
	}
</style>
