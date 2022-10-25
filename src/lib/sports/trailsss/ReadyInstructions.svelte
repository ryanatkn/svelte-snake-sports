<script lang="ts">
	import {scale} from 'svelte/transition';
	import type {Writable} from 'svelte/store';

	export let highscores: Writable<{time: number | null; applesEaten: number | null}>;
	export let applesToWin: number;
</script>

<div class="instructions" transition:scale|local>
	<div>keyboard controls below</div>
	<div style:position="relative" style:left="{-15}px">eat {applesToWin} apples to win! asap!!</div>
	{#if $highscores.time}<div style:position="relative" style:left="{25}px">
			besst is <strong>{$highscores.time}ms</strong>!
		</div>{/if}
	<div style:position="relative" style:left="{55}px">don't bite yoursself :]</div>
</div>
