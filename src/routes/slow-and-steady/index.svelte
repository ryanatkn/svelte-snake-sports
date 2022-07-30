<script lang="ts">
	// import Breadcrumbs from '@feltcoop/felt/ui/Breadcrumbs.svelte';
	import {base} from '$app/paths';

	import SlowAndSteadySnake from '$lib/sports/slow-and-steady/SlowAndSteadySnake.svelte';

	console.log(`base`, base);
</script>

<SlowAndSteadySnake />

<footer class="centered column-sm">
	<div class="padded-md">
		<a href="https://github.com/ryanatkn/svelte-snake-sports">ssources on GitHub</a>
	</div>
	<div class="padded-md markup">
		<p>
			<a href="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3">"Lurking Sloth"</a>
			by Alexander Nakarada <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</a>,
			<a href="https://www.serpentsoundstudios.com/">serpentsoundstudios.com</a>
		</p>
	</div>
	<div class="padded-md">
		<a href="/">go back home</a>
	</div>
	<!-- TODO why is this not working? latest sveltekit problem with Felt? -->
	<!-- <div class="padded-xl"> -->
	<!-- <Breadcrumbs basePath={base}>🐍</Breadcrumbs> -->
	<!-- </div> -->
</footer>

<div class="centered column">
	<img
		alt="logo for svelte snake sports: slow and steady"
		src="{base}/assets/slow-and-steady.webp"
	/>
</div>

<style>
	.markup {
		text-align: center;
	}
	img {
		margin-bottom: var(--spacing_xl7);
	}
</style>
