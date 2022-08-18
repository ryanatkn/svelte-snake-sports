<script lang="ts">
	import type {Direction} from '$lib/direction';
	import type {Writable} from 'svelte/store';

	export let movementCommandQueue: Writable<Direction[]>;
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
		width: 70px;
		font-weight: 700;
		color: var(--brown_text_color);
	}
</style>
