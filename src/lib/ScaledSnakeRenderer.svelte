<script lang="ts">
	import {browser} from '$app/env';

	import ScaledWorld from '$lib/ScaledWorld.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let autoScaleRenderer: boolean;
	export let rendererWidth: number;
	export let rendererHeight: number;
	export let updateRendererDimensions: (width: number, height: number) => void;
	export let paddingX = 32;
	export let paddingY = 32;
	export let marginTop = 400; // TODO the 400 is the height of the `TitleImage`
	export let marginBottom = 83; // TODO the 83 is the height of the `.scores`
	// TODO default?
	export let rect: DOMRect | undefined = undefined; // exposed for binding

	let height: number;
	$: height = rect?.height ?? 0;

	const dimensions = getDimensions();
	$: availableWidth = $dimensions.width - paddingX;
	$: availableHeight = $dimensions.height - paddingY;
	// TODO support more than a scaled square
	$: screenSize = Math.min(availableWidth, availableHeight, rendererWidth, rendererHeight);

	$: maxHeight = $dimensions.height - marginTop - marginBottom;
	$: maxSize = autoScaleRenderer
		? Math.min(availableWidth, maxHeight)
		: Math.min(rendererWidth, rendererHeight);
	$: updateRendererDimensions(maxSize, maxSize);

	// Move `--bg_y` to the screen center of the renderer,
	// so the vingette surrounds the game viewport.
	$: bg_y = marginTop + height / 2;
	$: if (browser) document.body.style.setProperty('--bg_y', bg_y + 'px');
</script>

<ScaledWorld
	screenWidth={screenSize}
	screenHeight={screenSize}
	worldWidth={rendererWidth}
	worldHeight={rendererHeight}
	bind:rect
>
	<slot />
</ScaledWorld>
