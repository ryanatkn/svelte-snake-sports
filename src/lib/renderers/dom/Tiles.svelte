<script lang="ts">
	export let mapWidth: number;
	export let mapHeight: number;
	export let tileWidth: number;
	export let tileHeight: number;
</script>

<!-- TODO do this with a repeating background on a single element instead of this madness -->
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
		background-color: #f7f1f1;
		border-radius: 15%;
	}
</style>
