<script lang="ts">
	import PauseInstructions from '$lib/PauseInstructions.svelte';
	import {getClock} from '$lib/clock';
	import InteractiveSurface from '$lib/InteractiveSurface.svelte';

	// Maybe we'll put an `InteractiveSurface` in here for the mouse/touch controls?

	const clock = getClock();

	$: ({running} = $clock);
</script>

<div class="gamespace">
	<slot />
	{#if !running}
		<PauseInstructions />
	{/if}
	<InteractiveSurface
		setPointerDown={(down) => {
			console.log('setPointerDown', down);
		}}
		setPointerPosition={(x, y) => {
			console.log('setPointerPosition', x, y);
		}}
	/>
</div>

<style>
	.gamespace {
		display: flex;
		position: relative;
	}
</style>
