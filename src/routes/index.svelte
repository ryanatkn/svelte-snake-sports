<script lang="ts">
	import Ssses from '$lib/Ssses.svelte';
	import SimpleSnake from '$lib/games/simple/SimpleSnake.svelte';

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
				><a href="https://github.com/ryanatkn/svelte-snake-games/tree/main/src/lib/games">games</a>
			</h1>
		</header>
	</section>
	<Ssses bind:ssses />
	<SimpleSnake />
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
