<script lang="ts">
	export let alt: string;
	export let src: string;
</script>

<div class="wrapper">
	<img {alt} {src} {...$$restProps} />
</div>

<style>
	.wrapper {
		display: flex;
		padding: var(--spacing_xl);
	}
	img {
		width: 368px;
		border-radius: 20%;
	}
	@media (max-width: 800px) {
		img {
			width: 227px;
		}
	}
	@media (max-width: 450px) {
		img {
			width: 141px;
		}
	}
</style>
