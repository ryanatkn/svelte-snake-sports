<script lang="ts">
	import OriginalSnake from '$lib/games/original/OriginalSnake.svelte';
	import Header from '$lib/Header.svelte';
</script>

<main class="markup column">
	<section>
		<Header />
	</section>
	<p><a href="/sss">sss</a></p>
	<OriginalSnake />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
</style>
