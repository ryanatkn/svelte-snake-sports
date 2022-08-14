<script lang="ts">
	import {browser} from '$app/env';

	import ScaledContent from '$lib/ScaledContent.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let rendererWidth: number;
	export let rendererHeight: number;
	export let updateRendererDimensions: (width: number, height: number) => void;
	export let paddingX = 32;
	export let paddingY = 32;
	export let marginBottom = 83; // TODO BLOCK the 83 is the height of the `.scores`
	// TODO default?
	export let rect: DOMRect | undefined = undefined; // exposed for binding

	let top: number;
	let height: number;
	$: top = rect?.top ?? 0;
	$: height = rect?.height ?? 0;

	const dimensions = getDimensions();
	$: availableWidth = $dimensions.width - paddingX;
	$: availableHeight = $dimensions.height - paddingY;
	// TODO support more than a scaled square
	$: screenSize = Math.min(availableWidth, availableHeight, rendererWidth, rendererHeight);

	$: maxHeight = $dimensions.height - top - marginBottom;
	$: maxSize = Math.min(availableWidth, maxHeight);
	$: updateRendererDimensions(maxSize, maxSize);

	// Move `--bg_y` to the screen center of the renderer,
	// so the vingette surrounds the game viewport.
	$: bg_y = top + height / 2;
	$: if (browser) document.body.style.setProperty('--bg_y', bg_y + 'px');
</script>

<ScaledContent
	screenWidth={screenSize}
	screenHeight={screenSize}
	worldWidth={rendererWidth}
	worldHeight={rendererHeight}
	bind:rect
>
	<slot />
</ScaledContent>
