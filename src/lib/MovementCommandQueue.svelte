<svelte:options immutable={false} />

<script lang="ts">
	import type {Direction} from '$lib/Entity';

	export let movementCommandQueue: Direction[];
</script>

>
{#each movementCommandQueue as direction}
	<span>{direction}</span>
{/each}

<style>
	span {
		padding: var(--spacing_sm);
	}
</style>
