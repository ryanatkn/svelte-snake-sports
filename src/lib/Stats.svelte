<script lang="ts">
	import type {Writable} from 'svelte/store';

	import Fps from '$lib/Fps.svelte';
	import type {ISnakeGame} from '$lib/SnakeGame';

	export let game: ISnakeGame;
	export let tickDuration: Writable<number> | undefined = undefined;

	$: ({runCount} = game);

	let fps: number;

	$: framesPerTick = fps && $tickDuration && Math.floor($tickDuration / (1000 / fps));
</script>

<ul class="Stats">
	<li>
		<div class="value">{$runCount}</div>
		lives
	</li>
	{#if $tickDuration}
		<li>
			<div class="value">{Math.round($tickDuration)}</div>
			ms per tick
		</li>
		<li>
			<div class="value">{framesPerTick ?? '??'}</div>
			frames per tick
		</li>
	{/if}
	<li>
		<div class="value">{fps ?? '??'}</div>
		fps
	</li>
</ul>
<Fps bind:fps />

<style>
	.Stats {
		display: flex;
		flex-direction: row;
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space_md);
	}

	.value {
		padding: 0 5px;
		font-size: var(--size_xl);
	}
</style>
