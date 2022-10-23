<script lang="ts">
	import {writable} from 'svelte/store';

	import ScaledWorld from '$lib/ScaledWorld.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let marginX = 32;
	export let marginTop = 400; // TODO the 400 is the height of the `TitleImage`
	export let marginBottom = 83; // TODO the 83 is the height of the `.scores` minus the paddingY
	// TODO default?

	// Exported for optional binding.
	export const rendererWidth = writable(0);
	export const rendererHeight = writable(0);
	export const autoAspectRatio = writable(false);
	export const aspectRatio = writable(1.0);

	const dimensions = getDimensions();
	$: availableWidth = Math.max(0, $dimensions.width - marginX);
	$: availableHeight = Math.max(0, $dimensions.height - marginTop - marginBottom);

	// TODO can these be computed separately, or do we need to do a single combined calculation?
	const scaleToAspectRatio = (
		width: number,
		height: number,
		newAspectRatio: number,
	): {width: number; height: number} => {
		const currentRatio = width / height;
		if (currentRatio > newAspectRatio) {
			return {width: width * (newAspectRatio / currentRatio), height};
		} else if (currentRatio < newAspectRatio) {
			return {width, height: height * (currentRatio / newAspectRatio)};
		} else {
			return {width, height};
		}
	};

	// the final dimensions may depend on the aspect ratio
	let screenWidth: number;
	let screenHeight: number;
	let worldWidth: number;
	let worldHeight: number;
	$: finalAspectRatio = $autoAspectRatio ? null : $aspectRatio;
	$: if (finalAspectRatio === null) {
		screenWidth = availableWidth;
		screenHeight = availableHeight;
		worldWidth = availableWidth;
		worldHeight = availableHeight;
	} else {
		const scaledScreen = scaleToAspectRatio(availableWidth, availableHeight, finalAspectRatio);
		screenWidth = scaledScreen.width;
		screenHeight = scaledScreen.height;
		const scaledWorld = scaleToAspectRatio(availableWidth, availableHeight, finalAspectRatio);
		worldWidth = scaledWorld.width;
		worldHeight = scaledWorld.height;
	}

	$: {
		$rendererWidth = worldWidth;
		$rendererHeight = worldHeight;
	}

	// Move `--bg_y` to the screen center of the renderer,
	// so the vingette surrounds the game viewport.
	$: bg_y = marginTop + screenHeight / 2;
	$: document.body.style.setProperty('--bg_y', bg_y + 'px');
</script>

<ScaledWorld {screenWidth} {screenHeight} {worldWidth} {worldHeight}>
	<slot {worldWidth} {worldHeight} />
</ScaledWorld>
