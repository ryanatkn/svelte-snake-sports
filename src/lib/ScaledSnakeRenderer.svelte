<script lang="ts">
	import type {Writable} from 'svelte/store';
	import {browser} from '$app/env';

	import ScaledContent from '$lib/ScaledContent.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let rendererWidth: Writable<number>;
	export let rendererHeight: Writable<number>;
	export let paddingX = 32;
	export let paddingY = 32;
	export let marginBottom = 83; // TODO BLOCK the 83 is the height of the `.scores`
	// TODO default?
	export let rect = {bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0}; // exposed for binding

	const dimensions = getDimensions();
	$: availableWidth = $dimensions.width - paddingX;
	$: availableHeight = $dimensions.height - paddingY;
	// TODO support more than a scaled square
	$: screenSize = Math.min(availableWidth, availableHeight, $rendererWidth, $rendererHeight);

	$: maxHeight = $dimensions.height - top - marginBottom;
	$: maxSize = Math.min(availableWidth, maxHeight);
	// TODO BLOCK circular?
	$: maxSize, ($rendererWidth = maxSize), ($rendererHeight = maxSize);

	$: ({top, height} = rect);

	// Move `--bg_y` to the screen center of the renderer,
	// so the vingette surrounds the game viewport.
	$: bg_y = top + height / 2;
	$: if (browser) document.body.style.setProperty('--bg_y', bg_y + 'px');
</script>

<ScaledContent
	screenWidth={screenSize}
	screenHeight={screenSize}
	worldWidth={$rendererWidth}
	worldHeight={$rendererHeight}
	bind:rect
>
	<slot />
</ScaledContent>
