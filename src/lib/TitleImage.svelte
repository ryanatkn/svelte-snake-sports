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
		padding-bottom: 0;
		max-width: 420px;
	}
	img {
		border-radius: 20%;
	}
</style>
