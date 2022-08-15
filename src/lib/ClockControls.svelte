<script lang="ts">
	import type {Clock} from '$lib/clock';

	export let clock: Clock;

	$: ({running} = $clock);
</script>

<button class="icon-button" on:click={() => clock.toggle()} title="[Backtick `] toggle clock"
	>{#if running}⏸{:else}▶️{/if}</button
>
