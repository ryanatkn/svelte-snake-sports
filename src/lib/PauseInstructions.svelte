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
		style:top="-115px"
		style:left="100px">paused</button
	>
	<button
		title="[Backtick `] unpause"
		on:click={() => clock.resume()}
		style:position="relative"
		style:top="-100px"
		style:left="60%">paused</button
	>
</div>
