<svelte:options immutable={false} />

<script lang="ts">
	// TODO what should the name/scope of this component be?

	export let x: number;
	export let y: number;
	export let scale: number;
	export let rotate: string | number = '0deg';
</script>

<div
	class="item"
	style:transform="translate3d({x}px, {y}px, 0px) scale3d({scale}, {scale}, {scale}) rotate({rotate})"
>
	<slot />
</div>

<style>
	.item {
		position: absolute;
		left: 0;
		top: 0;
		transition: transform 1s ease-out;
	}
</style>
