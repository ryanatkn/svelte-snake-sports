<script lang="ts">
	// name of this component?

	export let screenWidth: number;
	export let screenHeight: number;
	export let naturalWidth: number;
	export let naturalHeight: number;

	$: xScale = Math.min(1, screenWidth / naturalWidth);
	$: yScale = Math.min(1, screenHeight / naturalHeight);
	$: scale = Math.min(xScale, yScale);
</script>

<div class="scaled-content" style:width="{screenWidth}px" style:height="{screenHeight}px">
	<div style={`transform: scale3d(${scale}, ${scale}, 1);`}>
		<div style={`width: ${naturalWidth}px; height: ${naturalHeight}px;`}>
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
