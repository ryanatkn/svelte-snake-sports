<svelte:options immutable={false} />

<script lang="ts">
	import type {Entity} from '$lib/Entity';

	export let entity: Entity;
	// TODO is a hack just to get apples working, haven't been doing this pattern much
	export let classes = 'plain';

	$: ({width, height, x, y} = entity);

	$: positionX = x * width;
	$: positionY = y * height;
</script>

<div
	class="Entity {classes}"
	style:width="{width}px"
	style:height="{height}px"
	style:left="{positionX}px"
	style:top="{positionY}px"
/>

<style>
	.Entity {
		display: block;
		position: absolute;
	}
	/* TODO hacky */
	.plain {
		border-radius: 5px;
	}
</style>
