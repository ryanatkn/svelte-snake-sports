<script lang="ts">
	export let alt: string;
	export let src: string;
</script>

<div class="column">
	<img {alt} {src} {...$$restProps} />
</div>

<style>
	.column {
		display: flex;
		padding: var(--spacing_xl);
		padding-bottom: 0;
	}
	img {
		border-radius: 20%;
	}
</style>
