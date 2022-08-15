<script lang="ts">
	import type {Writable} from 'svelte/store';
	import {scale} from 'svelte/transition';

	import RestartInstructions from '$lib/RestartInstructions.svelte';

	export let applesEaten: number;
	export let highestApplesEaten: Writable<number>;
	export let restart: () => void;

	$: newHighScore = applesEaten === $highestApplesEaten;
</script>

<div class="instructions" transition:scale|local>
	<div>
		you ate <strong>{applesEaten}</strong> apple{#if applesEaten !== 1}s{/if}
		{#if applesEaten < 25}:o{:else}:O{/if}
	</div>
	<div style:position="relative" style:left="{25}px">
		{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {$highestApplesEaten}!{/if}
	</div>
	<RestartInstructions {restart}>
		{#if newHighScore}:D{:else}:)){/if}
	</RestartInstructions>
	<slot />
</div>
