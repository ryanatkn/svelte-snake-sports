<header class="centered-hz">
	<h1>
		<a href="https://svelte.dev/" title="Svelte: cybernetically enhanced web apps">svelte</a>
		<a class="snake" href="https://github.com/ryanatkn/svelte-snake-sports" title="source code"
			>🐍</a
		>
		<a href="https://wikipedia.org/wiki/Snake_game" title="Wikipedia on Snake (video game genre)"
			>snake</a
		>
		<a
			href="https://github.com/ryanatkn/svelte-snake-sports"
			title="source code"
			class="snake second-snake">🐍</a
		>
		<a
			href="https://github.com/ryanatkn/svelte-snake-sports/tree/main/src/lib/games"
			title="games source code">sports</a
		>
	</h1>
</header>

<style>
	h1 {
		display: flex;
		justify-content: center;
		align-items: centerr;
	}
	.snake {
		padding: 0 var(--spacing_sm);
		transform: rotate(8deg);
	}
	.second-snake {
		transform: rotate(-23deg);
	}
</style>
