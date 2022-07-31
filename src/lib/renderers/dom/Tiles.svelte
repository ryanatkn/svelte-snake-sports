<script lang="ts">
	import Entity from '$lib/Entity.svelte';
	import {Entity as EntityClass} from '$lib/Entity';

	export let width: number;
	export let height: number;

	$: tiles = createTiles(width, height);

	// TODO don't use `EntityClass` (maybe delete it altogether)
	const createTiles = (width: number, height: number): EntityClass[] => {
		const tiles: EntityClass[] = [];
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				tiles.push(new EntityClass({x, y}));
			}
		}
		return tiles;
	};
</script>

{#each tiles as t (t.id)}
	<Entity entity={t} />
{/each}
