<script lang="ts">
	import {scale} from 'svelte/transition';

	import {getClock} from '$lib/clock';

	const clock = getClock();
</script>

<div class="instructions" transition:scale|local>
	<button
		title="[Backtick `] unpause"
		on:click={() => clock.resume()}
		style:position="relative"
		style:top="-125px"
		style:left="100px">paused</button
	>
	<button
		title="[Backtick `] unpause"
		on:click={() => clock.resume()}
		style:position="relative"
		style:top="-110px"
		style:left="50px">paused</button
	>
</div>

<style>
	.instructions {
		width: 0;
		height: 0;
	}
</style>
