<script lang="ts">
	export let x: number;
	export let y: number;
	export let width: number;
	export let height: number;
	// TODO is a hack just to get apples working, I haven't been using this pattern recently
	export let classes = 'plain';

	// TODO BLOCK
	const transition_duration = 100;

	$: positionX = x * width;
	$: positionY = y * height;
</script>

<div
	class="Entity {classes}"
	style:width="{width}px"
	style:height="{height}px"
	style:transform="translate3d({positionX}px, {positionY}px, 0)"
	style:z-index={1000 + y}
	style:--transition_duration={transition_duration}
/>

<style>
	.Entity {
		display: block;
		position: absolute;
		/* TODO BLOCK make duration half of the tick  */
		transition: transform calc(var(--transition_duration) * 1ms) ease-in-out;
	}
	/* TODO hacky */
	.plain {
		border-radius: 15%;
	}
</style>
