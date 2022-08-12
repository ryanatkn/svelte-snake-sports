<script lang="ts">
	import PauseInstructions from '$lib/PauseInstructions.svelte';
	import {getClock} from '$lib/clock';

	// Maybe we'll put an `InteractiveSurface` in here for the mouse/touch controls?

	const clock = getClock();

	$: ({running} = $clock);
</script>

<div class="gamespace">
	<slot />
	{#if !running}
		<PauseInstructions />
	{/if}
</div>

<style>
	.gamespace {
		display: flex;
		position: relative;
	}
</style>
