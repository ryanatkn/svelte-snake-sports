<script lang="ts">
	import type {Writable} from 'svelte/store';

	import {fade} from 'svelte/transition';

	export let applesEaten: number;
	export let highestApplesEaten: Writable<number>;

	$: newHighScore = applesEaten === $highestApplesEaten;
</script>

<div class="instructions" transition:fade|local>
	<div>
		you ate <strong>{applesEaten}</strong> apple{#if applesEaten !== 1}s{/if} :O
	</div>
	<div style:position="relative" style:left="{25}px">
		{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {$highestApplesEaten}!{/if}
	</div>
	<div style:position="relative" style:left="{-25}px">
		presss <code>r</code> to go again {#if newHighScore}:D{:else}:)){/if}
	</div>
</div>
