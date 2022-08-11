<script lang="ts">
	export let mapWidth: number;
	export let mapHeight: number;
	export let tileWidth: number;
	export let tileHeight: number;
</script>

<!-- this is inefficient with current usage -- a single element with a repeating bg would be better --
	but we'll probably do more with individual tile rendering so it's fine for now -->
{#each {length: mapWidth} as _, x (x)}
	{#each {length: mapHeight} as _, y (x + ':' + y)}
		<div
			class="tile"
			style:width="{tileWidth}px"
			style:height="{tileHeight}px"
			style:transform="translate3d({x * tileWidth}px, {y * tileHeight}px, 0)"
		/>
	{/each}
{/each}

<style>
	.tile {
		position: absolute;
		background-color: var(--medium_brown);
		border-radius: 15%;
	}
</style>
