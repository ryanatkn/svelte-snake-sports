<script lang="ts">
	// Not sure how useful this component is --
	// the point is to provide a wrapper element around for the scaled renderer
	// and unscaled UI like the instructions.

	// Maybe we'll put an `InteractiveSurface` in here for the mouse/touch controls?
</script>

<div class="gamespace">
	<slot />
</div>

<style>
	.gamespace {
		display: flex;
		position: relative;
	}
</style>
