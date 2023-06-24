<script lang="ts">
	import {base} from '$app/paths';

	export let alt: string;
	export let src: string;
</script>

<div class="title_image">
	<!-- TODO change to this after upgrading deps -->
	<!-- <Breadcrumbs>🐍</Breadcrumbs> -->
	<a href="{base}/"> 🐍 </a>
	<img {alt} {src} {...$$restProps} />
</div>

<style>
	.title_image {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--spacing_xl);
	}
	a {
		padding-bottom: var(--spacing_lg);
	}
	img {
		width: 256px;
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
