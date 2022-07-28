<svelte:options immutable={false} />

<script lang="ts">
	import type {Direction} from '$lib/Entity';
	import type {Writable} from 'svelte/store';

	export let movementCommandQueue: Writable<Direction[]>;
</script>

<ul>
	{#each $movementCommandQueue as direction}
		<li>> {direction}</li>
	{:else}
		<li>></li>
	{/each}
</ul>

<style>
	ul {
		width: 100px;
	}
</style>
