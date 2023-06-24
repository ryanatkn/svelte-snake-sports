<script lang="ts">
	import {base} from '$app/paths';

	export let alt: string;
	export let src: string;
</script>

<div class="title_image">
	<a href="{base}/">
		<img {alt} {src} {...$$restProps} />
	</a>
</div>

<style>
	.title_image {
		display: flex;
		padding: var(--spacing_xl);
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
