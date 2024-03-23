<script lang="ts">
	import {scale} from 'svelte/transition';

	// This used to be the same as `Entity.svelte` but was extracted for animations.
	// Not sure if they should be recombined.

	// TODO show a different out transition if the apple was eaten vs despawned

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
	class="apple entity {classes}"
	style:width="{width}px"
	style:height="{height}px"
	style:transform="translate3d({positionX}px, {positionY}px, 0)"
	style:z-index={1000 + y}
	in:scale|local={{duration: 630}}
	out:scale|local={{duration: 250}}
/>

<style>
	.apple {
		display: block;
		position: absolute;
	}
	/* TODO hacky */
	.plain {
		border-radius: 15%;
	}
</style>
