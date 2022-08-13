<script lang="ts">
	import type {Writable} from 'svelte/store';
	import {browser} from '$app/env';

	import ScaledContent from '$lib/ScaledContent.svelte';
	import {getDimensions} from '$lib/Dimensions.svelte';

	export let rendererWidth: Writable<number>;
	export let rendererHeight: Writable<number>;
	// TODO default?
	export let rect = {bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0}; // exposed for binding

	const dimensions = getDimensions();
	const PADDING = 32; // TODO hacky just to get it working, shouldn't be needed
	$: availableWidth = $dimensions.width - PADDING;
	$: availableHeight = $dimensions.height - PADDING;
	$: screenSize = Math.min(availableWidth, availableHeight, $rendererWidth, $rendererHeight);

	$: ({top, height} = rect);

	$: bg_y = top + height / 2;
	$: if (browser) document.body.style.setProperty('--bg_y', bg_y + 'px');
</script>

<svelte:body style:--bg_y={bg_y} />

<ScaledContent
	screenWidth={screenSize}
	screenHeight={screenSize}
	worldWidth={$rendererWidth}
	worldHeight={$rendererHeight}
	bind:rect
>
	<slot />
</ScaledContent>
