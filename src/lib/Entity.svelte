<script lang="ts">
	import type {Entity} from '../models/Entity';

	export let entity: Entity;

	$: positionX = entity.x * entity.width;
	$: positionY = entity.y * entity.height;
</script>

<div
	class="Entity"
	style:width="{entity.width}px"
	style:height="{entity.height}px"
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
