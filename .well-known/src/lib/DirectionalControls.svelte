<script lang="ts">
	import type {Direction} from '$lib/direction';

	export let selectedDirection: Direction | undefined;
	export let select: (direction: Direction) => void;
</script>

<!-- TODO create a hotkey system so we can generate the instructions -->
<div class="directional-controls">
	<button
		class="icon-button"
		title="queue move left [a, h, left arrow] [hold shift to end turn]"
		class:selected={selectedDirection === 'left'}
		on:click={() => select('left')}>←</button
	>
	<div class="up-and-down">
		<button
			class="icon-button"
			title="queue move up [w, k, up arrow] [hold shift to end turn]"
			class:selected={selectedDirection === 'up'}
			on:click={() => select('up')}>↑</button
		>
		<button
			class="icon-button"
			title="queue move down [s, j, down arrow] [hold shift to end turn]"
			class:selected={selectedDirection === 'down'}
			on:click={() => select('down')}>↓</button
		>
	</div>
	<button
		class="icon-button"
		title="queue move right [d, l, right arrow] [hold shift to end turn]"
		class:selected={selectedDirection === 'right'}
		on:click={() => select('right')}>→</button
	>
</div>

<style>
	.directional-controls {
		display: flex;
		align-items: center;
	}
	.up-and-down {
		display: flex;
		flex-direction: column;
	}
</style>
