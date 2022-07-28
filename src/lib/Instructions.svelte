<script lang="ts">
	import type SnakeGame from '$lib/SnakeGame.svelte';

	export let game: SnakeGame;

	$: ({highScore} = game);
</script>

<div class="Instructions">
	<p>use the arrow keys to move</p>
	<p style:position="relative" style:left="{-15}px">eat apples!</p>
	{#if highScore}
		<p>
			besst is {$highScore} apple{$highScore === 1 ? '' : 's'}!
		</p>
	{/if}
	<p style:position="relative" style:left="{55}px">don't bite yourself :O</p>
</div>

<style>
	.Instructions {
		position: absolute;
		top: 208px;
		left: 250px;
		font-size: 18px;
		font-weight: 300;
		word-break: break-all;
	}
</style>
