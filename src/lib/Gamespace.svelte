<script lang="ts">
	import PauseInstructions from '$lib/PauseInstructions.svelte';
	import {getClock} from '$lib/clock';
	import InteractiveSurface from '$lib/InteractiveSurface.svelte';

	// Maybe we'll put an `InteractiveSurface` in here for the mouse/touch controls?
	/*

	TODO BLOCK

	- events or callbacks?
	- get angle to snake head -- how? in the game impls, not here?

	*/

	export let pointerDown = false;
	export let pointerX: number | undefined = undefined;
	export let pointerY: number | undefined = undefined;

	const clock = getClock();

	$: ({running} = $clock);
</script>

<div class="gamespace">
	<slot />
	<div class="interactive-surface-wrapper">
		<InteractiveSurface
			setPointerDown={(down) => {
				pointerDown = down;
			}}
			setPointerPosition={(x, y) => {
				pointerX = x;
				pointerY = y;
			}}
		/>
	</div>
	<slot name="overlay" />
	{#if !running}
		<PauseInstructions />
	{/if}
</div>

<style>
	.gamespace {
		display: flex;
		position: relative;
	}
	.interactive-surface-wrapper {
		position: fixed;
		inset: 0;
	}
</style>
