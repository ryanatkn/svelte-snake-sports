<script lang="ts">
	import Score from '$lib/Score.svelte';

	export let applesEaten: number;
	export let highestApplesEaten: number | null;
</script>

<Score title="apples eaten this try" progressKey={applesEaten === 0 ? undefined : applesEaten}
	>{applesEaten}</Score
>
{#if highestApplesEaten && highestApplesEaten !== applesEaten}
	<Score title="the most apples you've ever eaten">{highestApplesEaten}</Score>
{/if}
