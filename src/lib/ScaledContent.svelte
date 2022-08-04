<script lang="ts">
	// name of this component?

	export let renderedWidth: number;
	export let renderedHeight: number;
	export let naturalWidth: number;
	export let naturalHeight: number;

	$: xScale = Math.min(1, renderedWidth / naturalWidth);
	$: yScale = Math.min(1, renderedHeight / naturalHeight);
	$: scale = Math.min(xScale, yScale);
</script>

<div class="scaled-content" style:width="{renderedWidth}px" style:height="{renderedHeight}px">
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
