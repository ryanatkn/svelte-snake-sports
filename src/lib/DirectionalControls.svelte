<script lang="ts">
	import type {Direction} from './Entity';

	export let selectedDirection: Direction | undefined; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents -- TODO seems to be a bug
	export let select: (direction: Direction) => void;
</script>

<div class="directional-controls">
	<button class:selected={selectedDirection === 'left'} on:click={() => select('left')}>⬅</button>
	<div class="up-and-down">
		<button class:selected={selectedDirection === 'up'} on:click={() => select('up')}>⬆</button>
		<button class:selected={selectedDirection === 'down'} on:click={() => select('down')}>⬇</button>
	</div>
	<button class:selected={selectedDirection === 'right'} on:click={() => select('right')}>➡</button>
</div>

<style>
	.directional-controls {
		display: flex;
		align-items: center;
	}
	button {
		padding: var(--spacing_xl);
	}
	.up-and-down {
		display: flex;
		flex-direction: column;
	}
</style>
