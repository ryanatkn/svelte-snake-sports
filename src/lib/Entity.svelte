<svelte:options immutable={false} />

<script lang="ts">
	import type {Entity} from '$lib/Entity';

	export let entity: Entity;

	$: ({width, height, x, y} = entity);

	$: positionX = x * width;
	$: positionY = y * height;
</script>

<div
	class="Entity"
	style:width="{width}px"
	style:height="{height}px"
	style:left="{positionX}px"
	style:top="{positionY}px"
/>

<style>
	.Entity {
		display: block;
		position: absolute;
		border-radius: 5px;
	}
</style>
