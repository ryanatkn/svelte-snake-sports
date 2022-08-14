<script lang="ts">
	export let mapWidth: number;
	export let mapHeight: number;
</script>

<!-- this is inefficient with current usage -- a single element with a repeating bg would be better --
	but we'll probably do more with individual tile rendering so it's fine for now -->
{#each {length: mapWidth} as _, x (x)}
	{#each {length: mapHeight} as _, y (x + ':' + y)}
		<div class="tile" style:--x={x} style:--y={y} />
	{/each}
{/each}

<style>
	.tile {
		position: absolute;
		background-color: var(--medium_brown);
		border-radius: 15%;
		width: var(--entity_width);
		height: var(--entity_height);
		transform: translate3d(
			calc(var(--x) * var(--entity_width)),
			calc(var(--y) * var(--entity_height)),
			0
		);
	}
</style>
