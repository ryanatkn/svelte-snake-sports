<script lang="ts">
	import Surface from '@feltjs/felt-ui/Surface.svelte';

	import PauseInstructions from '$lib/PauseInstructions.svelte';
	import {getClock} from '$lib/clock';

	export let pointerDown = false;
	export let pointerX: number | undefined = undefined;
	export let pointerY: number | undefined = undefined;

	const clock = getClock();

	$: ({running} = $clock);
</script>

<div class="gamespace">
	<slot />
	<div class="interactive-surface-wrapper">
		<Surface bind:pointerDown bind:pointerX bind:pointerY />
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
		position: absolute;
		inset: 0;
		z-index: 0;
	}
</style>
