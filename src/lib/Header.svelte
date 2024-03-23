<script lang="ts">
	import {base} from '$app/paths';
	import {random_item} from '@ryanatkn/belt/random.js';
	import {sports} from '$lib/sports';

	const randomSport = random_item(sports);
</script>

<header class="box row prose">
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
		<a href="{base}{randomSport.slug}" title="play a random svelte snake sport!">sports</a>
	</h1>
</header>

<style>
	h1 {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		text-shadow:
			2px 2px var(--dark_brown),
			-1px -1px var(--bright_green);
	}
	@media (max-width: 550px) {
		h1 {
			font-size: var(--size_xl2);
		}
	}
	@media (max-width: 450px) {
		h1 {
			font-size: var(--size_xl);
		}
	}
	.snake {
		padding: 0 var(--space_sm);
		transform: rotate(8deg);
	}
	.second-snake {
		transform: rotate(-23deg);
	}
</style>
