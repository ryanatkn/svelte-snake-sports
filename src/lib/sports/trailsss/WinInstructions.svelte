<script lang="ts">
	import {scale} from 'svelte/transition';
	import type {Writable} from 'svelte/store';
	import RestartInstructions from '$lib/RestartInstructions.svelte';

	export let highscores: Writable<{time: number | null; applesEaten: number | null}>; // TODO don't need to handle `null` here, would need upstream changes
	export let time: number;
	export let applesEaten: number;
	export let applesToWin: number;
	export let restart: () => void;

	let winType: 'time' | 'applesEaten';
	$: winType = applesEaten > applesToWin ? 'applesEaten' : 'time';

	// TODO doesn't detect if you equal your old score exactly,
	// but that's super unlikely in most cases (though some games may possibly have "perfect" play)

	// These times are in milliseconds with fractional parts,
	// but we only care about whole milliseconds for the UX.
	$: roundedTime = Math.round(time);
	$: roundedBestTime = $highscores.time === null ? 0 : Math.round($highscores.time);
	$: newHighScore =
		winType === 'time'
			? roundedTime === roundedBestTime
			: !$highscores.applesEaten || applesEaten >= $highscores.applesEaten;
</script>

<div class="instructions" transition:scale|local>
	{#if winType === 'time'}
		<div>you ate {applesToWin} apples...</div>
		<div style:position="relative" style:left="{55}px">in <strong>{roundedTime}ms</strong>!</div>
		<div style:position="relative" style:left="{25}px">
			{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {roundedBestTime}ms!{/if}
		</div>
	{:else if winType === 'applesEaten'}
		<div>
			you ate <strong>{applesEaten}</strong> apple{#if applesEaten !== 1}s{/if}
			{#if applesEaten < 25}:o{:else}:O{/if}
		</div>
		<div style:position="relative" style:left="{25}px">
			{#if newHighScore}<strong>a new high score!!</strong>{:else}besst is {$highscores.applesEaten}!{/if}
		</div>
	{/if}
	<RestartInstructions {restart}>
		{#if newHighScore}:D{:else}:)){/if}
	</RestartInstructions>
	<slot />
</div>
