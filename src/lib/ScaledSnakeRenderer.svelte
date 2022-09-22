<script lang="ts">
	import {browser} from '$app/environment';

	import ScaledWorld from '$lib/ScaledWorld.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let autoScaleRenderer: boolean;
	export let rendererWidth: number;
	export let rendererHeight: number;
	export let updateRendererDimensions: (width: number, height: number) => void;
	export let autoAspectRatio: boolean;
	export let aspectRatio: number;
	export let marginX = 32;
	export let marginTop = 400; // TODO the 400 is the height of the `TitleImage`
	export let marginBottom = 83; // TODO the 83 is the height of the `.scores` minus the paddingY
	// TODO default?
	export let rect: DOMRect | undefined = undefined; // exposed for binding

	let height: number;
	$: height = rect?.height ?? 0;

	const dimensions = getDimensions();
	$: availableWidth = Math.max(0, $dimensions.width - marginX);
	$: availableHeight = Math.max(0, $dimensions.height - marginTop - marginBottom);
	// TODO support more than a scaled square
	$: rawScreenWidth = Math.min(availableWidth, rendererWidth);
	$: rawScreenHeight = Math.min(availableHeight, rendererHeight);
	$: rawWorldWidth = Math.max(0, autoScaleRenderer ? availableWidth : rendererWidth);
	$: rawWorldHeight = Math.max(0, autoScaleRenderer ? availableHeight : rendererHeight);

	// TODO can these be computed separately, or do we need to do a single combined calculation?
	const scaleToAspectRatio = (
		width: number,
		height: number,
		aspectRatio: number,
	): {width: number; height: number} => {
		const currentRatio = width / height;
		if (currentRatio > aspectRatio) {
			return {width: width * (aspectRatio / currentRatio), height};
		} else if (currentRatio < aspectRatio) {
			return {width, height: height * (currentRatio / aspectRatio)};
		} else {
			return {width, height};
		}
	};

	// the final dimensions may depend on the aspect ratio
	let screenWidth: number;
	let screenHeight: number;
	let worldWidth: number;
	let worldHeight: number;
	$: finalAspectRatio = autoAspectRatio ? null : aspectRatio;
	$: if (finalAspectRatio === null) {
		screenWidth = rawScreenWidth;
		screenHeight = rawScreenHeight;
		worldWidth = rawWorldWidth;
		worldHeight = rawWorldHeight;
	} else {
		const scaledScreen = scaleToAspectRatio(rawScreenWidth, rawScreenHeight, finalAspectRatio);
		screenWidth = scaledScreen.width;
		screenHeight = scaledScreen.height;
		const scaledWorld = scaleToAspectRatio(rawWorldWidth, rawWorldHeight, finalAspectRatio);
		worldWidth = scaledWorld.width;
		worldHeight = scaledWorld.height;
	}

	$: if (autoScaleRenderer) {
		updateRendererDimensions(worldWidth, worldHeight);
	}

	// Move `--bg_y` to the screen center of the renderer,
	// so the vingette surrounds the game viewport.
	$: bg_y = marginTop + height / 2;
	$: if (browser) document.body.style.setProperty('--bg_y', bg_y + 'px');
</script>

<ScaledWorld {screenWidth} {screenHeight} {worldWidth} {worldHeight} bind:rect>
	<slot {worldWidth} {worldHeight} />
</ScaledWorld>
