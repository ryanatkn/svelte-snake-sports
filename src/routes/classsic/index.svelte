<script lang="ts">
	import Breadcrumbs from '@feltcoop/felt/ui/Breadcrumbs.svelte';

	import ClasssicSnake from '$lib/sports/classsic/ClasssicSnake.svelte';
</script>

<ClasssicSnake />

<footer class="centered column-sm">
	<div class="padded-md">
		<a href="https://github.com/ryanatkn/svelte-snake-sports">ssources</a>
	</div>
	<div class="padded-md markup">
		<p>
			<a href="/assets/Alexander_Nakarada__Lurking_Sloth.mp3">"Lurking Sloth"</a>
			by Alexander Nakarada <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</a>,
			<a href="https://www.serpentsoundstudios.com/">serpentsoundstudios.com</a>
		</p>
	</div>
	<div class="padded-xl">
		<Breadcrumbs>🐍</Breadcrumbs>
	</div>
</footer>

<style>
	.markup {
		text-align: center;
	}
</style>
