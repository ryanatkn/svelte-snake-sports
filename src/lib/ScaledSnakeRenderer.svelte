<script lang="ts">
	import ScaledContent from '$lib/ScaledContent.svelte';
	import {getDimensions} from '$lib/dimensions';

	const dimensions = getDimensions();
	// TODO also this is wonky because it doesn't account for scrollbars,
	// using window dimensions instead of clientWidth/Height of an element
	const PADDING = 30; // TODO hacky just to get it working, shouldn't be needed
	$: availableWidth = $dimensions.width - PADDING;
	$: availableHeight = $dimensions.height - PADDING;
	const maxRenderedWidth = 512;
	const maxRenderedHeight = 512;
	$: renderedSize = Math.min(availableWidth, availableHeight, maxRenderedWidth, maxRenderedHeight);
</script>

<ScaledContent
	renderedWidth={renderedSize}
	renderedHeight={renderedSize}
	naturalWidth={512}
	naturalHeight={512}
>
	<slot />
</ScaledContent>
