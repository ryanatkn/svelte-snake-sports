<script lang="ts">
	import Ssses from '$lib/Ssses.svelte';

	let ssses: Array<{icon: string}> | undefined;
</script>

<main class="markup column">
	<section>
		<header class="centered-hz">
			<h1>
				<a href="https://svelte.dev/">svelte</a><small
					><a href="https://github.com/ryanatkn/svelte-snake-games">🐍</a></small
				><a href="https://wikipedia.org/wiki/Snake_game">snake</a><small
					><a href="https://github.com/ryanatkn/svelte-snake-games">🐍</a></small
				>games
			</h1>
		</header>
	</section>
	<Ssses bind:ssses />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
	h1 {
		text-align: center;
	}
</style>
