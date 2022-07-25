<script lang="ts">
	import OriginalSnake from '$lib/games/original/OriginalSnake.svelte';
	import Header from '$lib/Header.svelte';
</script>

<main class="markup column">
	<section>
		<Header />
	</section>
	<menu
		><li><a href="/original">original</a></li>
		<li><a href="/sss">sss</a></li></menu
	>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
</style>
