<script lang="ts">
	import type {Direction} from '$lib/Entity';

	export let selectedDirection: Direction | undefined; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents -- TODO seems to be a bug
	export let select: (direction: Direction) => void;
</script>

<div class="directional-controls">
	<button
		title="move left [a, h, left arrow]"
		class:selected={selectedDirection === 'left'}
		on:click={() => select('left')}>⬅</button
	>
	<div class="up-and-down">
		<button
			title="move up [w, k, up arrow]"
			class:selected={selectedDirection === 'up'}
			on:click={() => select('up')}>⬆</button
		>
		<button
			title="move down [s, j, down arrow]"
			class:selected={selectedDirection === 'down'}
			on:click={() => select('down')}>⬇</button
		>
	</div>
	<button
		title="move right [d, l, right arrow]"
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
