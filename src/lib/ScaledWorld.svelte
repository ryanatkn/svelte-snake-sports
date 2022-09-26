<script lang="ts">
	import {measure} from '$lib/measure';

	export let screenWidth: number;
	export let screenHeight: number;
	export let worldWidth: number;
	export let worldHeight: number;
	// TODO BLOCK this needs to measure relative to the top of the page, not viewport
	export let rect = new DOMRect(0, 0, 0, 0); // exposed for binding

	$: xScale = Math.min(1, screenWidth / worldWidth);
	$: yScale = Math.min(1, screenHeight / worldHeight);
	$: scale = Math.min(xScale, yScale);

	// TODO where does this belong? maybe rethink? It's what the original sizes were based around.
	const BASE_SIZE = 512;
	$: renderer_scale = Math.min(worldWidth, worldHeight) / BASE_SIZE;
</script>

<div
	use:measure={(r) => (rect = r)}
	class="scaled-world"
	style:--screen_width={screenWidth}
	style:--screen_height={screenHeight}
	style:--renderer_scale={renderer_scale}
>
	<div style={`transform: scale3d(${scale}, ${scale}, 1);`}>
		<div class="world" style:--world_width={worldWidth} style:--world_height={worldHeight}>
			<slot />
		</div>
	</div>
</div>

<style>
	.scaled-world {
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--screen_width) * 1px);
		height: calc(var(--screen_height) * 1px);
	}
	.world {
		width: calc(var(--world_width) * 1px);
		height: calc(var(--world_height) * 1px);
	}
</style>
