<script lang="ts">
	import type {Clock} from '$lib/clock';

	export let clock: Clock;

	$: ({running} = $clock);
</script>

<button on:click={() => clock.toggle()}
	>{#if running}⏸{:else}▶{/if}</button
>

<style>
	button {
		font-size: var(--font_size_xl3);
	}
</style>
