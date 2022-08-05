<script lang="ts">
	import type {Direction} from '$lib/Entity';

	export let selectedDirection: Direction | undefined;
	export let select: (direction: Direction) => void;
</script>

<!-- TODO create a hotkey system so we can generate the instructions -->
<div class="directional-controls">
	<button
		title="queue move left [a, h, left arrow] [end turn with shift or ctrl]"
		class:selected={selectedDirection === 'left'}
		on:click={() => select('left')}>⬅</button
	>
	<div class="up-and-down">
		<button
			title="queue move up [w, k, up arrow] [end turn with shift or ctrl]"
			class:selected={selectedDirection === 'up'}
			on:click={() => select('up')}>⬆</button
		>
		<button
			title="queue move down [s, j, down arrow] [end turn with shift or ctrl]"
			class:selected={selectedDirection === 'down'}
			on:click={() => select('down')}>⬇</button
		>
	</div>
	<button
		title="queue move right [d, l, right arrow] [end turn with shift or ctrl]"
		class:selected={selectedDirection === 'right'}
		on:click={() => select('right')}>➡</button
	>
</div>

<style>
	.directional-controls {
		display: flex;
		align-items: center;
	}
	button {
		padding: var(--spacing_xl);
		font-size: var(--font_size_md);
		min-width: 53px;
	}
	.up-and-down {
		display: flex;
		flex-direction: column;
	}
</style>
