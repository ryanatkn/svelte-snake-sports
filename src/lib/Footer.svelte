<script lang="ts">
	import {base} from '$app/paths';
	import {page} from '$app/stores';

	// import Breadcrumbs from '@feltcoop/felt/ui/Breadcrumbs.svelte';
</script>

<footer class="centered column-sm">
	<div class="padded-md">
		<a href="https://github.com/ryanatkn/svelte-snake-sports">ssources & creditss on GitHub</a>
	</div>
	<div class="padded-md markup">
		<p>
			<a href="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3">"Lurking Sloth"</a>
			by Alexander Nakarada
			<br />
			<a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</a> ∙
			<a href="https://www.serpentsoundstudios.com/">serpentsoundstudios.com</a>
		</p>
	</div>
	{#if $page.url.pathname !== '/'}
		<div class="padded-md">
			<a href="{base}/">go back home</a>
		</div>
	{/if}
	<!-- TODO why is this not working? latest sveltekit problem with Felt? -->
	<!-- <div class="padded-xl"> -->
	<!-- <Breadcrumbs basePath={base}>🐍</Breadcrumbs> -->
	<!-- </div> -->
</footer>

<style>
	.markup {
		text-align: center;
	}
</style>
