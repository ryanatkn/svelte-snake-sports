<script lang="ts">
	import {fade} from 'svelte/transition';

	import type SnakeGame from '$lib/SnakeGame.svelte';

	export let game: SnakeGame;

	$: ({highScore} = game);
</script>

<div class="Instructions" transition:fade|local>
	<p>move with arrow keys</p>
	<p style:position="relative" style:left="{-15}px">eat apples!</p>
	{#if highScore}
		<p>
			besst is {$highScore} apple{$highScore === 1 ? '' : 's'}!
		</p>
	{/if}
	<p style:position="relative" style:left="{55}px">don't bite yoursself :]</p>
</div>

<style>
	.Instructions {
		position: absolute;
		top: 208px;
		left: 250px;
		font-size: var(--font_size_lg);
	}
</style>
