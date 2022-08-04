<script lang="ts">
	import type {Writable} from 'svelte/store';

	import ScaledContent from '$lib/ScaledContent.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let rendererWidth: Writable<number>;
	export let rendererHeight: Writable<number>;

	const dimensions = getDimensions();
	const PADDING = 32; // TODO hacky just to get it working, shouldn't be needed
	$: availableWidth = $dimensions.width - PADDING;
	$: availableHeight = $dimensions.height - PADDING;
	$: screenSize = Math.min(availableWidth, availableHeight, $rendererWidth, $rendererHeight);
</script>

<ScaledContent
	screenWidth={screenSize}
	screenHeight={screenSize}
	naturalWidth={$rendererWidth}
	naturalHeight={$rendererHeight}
>
	<slot />
</ScaledContent>
