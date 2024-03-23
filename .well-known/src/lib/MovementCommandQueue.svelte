<script lang="ts">
	import type {Direction} from '$lib/direction';
	import type {Writable} from 'svelte/store';

	export let movementCommandQueue: Writable<Direction[]>;
	export let queueSize: number;

	const to_items = (directions: Direction[], size: number): string[] => {
		const items: string[] = new Array(size);
		for (let i = 0; i < size; i++) {
			const direction = directions[i];
			if (direction === undefined) {
				items[i] = i === 0 ? '...' : '';
			} else {
				items[i] = direction;
			}
		}
		return items;
	};

	$: items = to_items($movementCommandQueue, queueSize);
</script>

<ul>
	{#each items as item}
		<li>> {item}</li>
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
