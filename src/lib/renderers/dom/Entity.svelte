<script lang="ts">
	export let x: number;
	export let y: number;
	export let width: number;
	export let height: number;
	// TODO is a hack just to get apples working, I haven't been using this pattern recently
	export let classes = 'plain';

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
		border-radius: 15%;
	}
</style>
