<script lang="ts">
	import type {Clock} from '$lib/clock';

	export let clock: Clock;

	$: ({running} = $clock);
</script>

<button class="icon-button" on:click={() => clock.toggle()} title="[Backtick] toggle clock"
	>{#if running}⏸{:else}▶️{/if}</button
>

<style>
	button {
		filter: hue-rotate(calc(var(--blue_to_brown_hue_rotation) * 1deg));
	}
</style>
