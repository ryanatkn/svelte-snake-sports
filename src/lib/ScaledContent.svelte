<script lang="ts">
	import {onMount} from 'svelte';

	// name of this component?

	export let screenWidth: number;
	export let screenHeight: number;
	export let worldWidth: number;
	export let worldHeight: number;
	// TODO default?
	export let rect = {bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0}; // exposed for binding

	$: xScale = Math.min(1, screenWidth / worldWidth);
	$: yScale = Math.min(1, screenHeight / worldHeight);
	$: scale = Math.min(xScale, yScale);

	let el: Element;

	$: el && (scale, (rect = el.getBoundingClientRect()));

	// TODO BLOCK hardcoded 512
	$: renderer_scale = Math.min(worldWidth, worldHeight) / 512;

	onMount(() => {
		// TODO mutation observer?
		rect = el.getBoundingClientRect();
	});
</script>

<div
	class="scaled-content"
	style:width="{screenWidth}px"
	style:height="{screenHeight}px"
	style:--renderer_scale={renderer_scale}
	bind:this={el}
>
	<div style={`transform: scale3d(${scale}, ${scale}, 1);`}>
		<div style={`width: ${worldWidth}px; height: ${worldHeight}px;`}>
			<slot />
		</div>
	</div>
</div>

<style>
	.scaled-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
