<svelte:options immutable={false} />

<script lang="ts">
	import type {Direction} from '$lib/Entity';
	import type {Writable} from 'svelte/store';

	export let movementCommandQueue: Writable<Direction[]>;
</script>

>
{#each $movementCommandQueue as direction}
	<span>{direction}</span>
{/each}

<style>
	span {
		padding: var(--spacing_sm);
	}
</style>
