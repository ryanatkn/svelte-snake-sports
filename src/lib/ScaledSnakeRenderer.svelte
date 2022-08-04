<script lang="ts">
	import ScaledContent from '$lib/ScaledContent.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	const dimensions = getDimensions();
	const PADDING = 32; // TODO hacky just to get it working, shouldn't be needed
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
