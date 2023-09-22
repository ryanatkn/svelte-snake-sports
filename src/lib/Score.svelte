<script lang="ts">
	import TextBurst from '$lib/TextBurst.svelte';
	import {bouncey} from '$lib/bouncey';

	export let title = 'score';
	export let textBurstItems: string[] | null = ['🍎', '🍏'];
	export let progressKey: any = undefined;

	const bounce = bouncey();
	$: bounce.updateKey(progressKey);
</script>

<div class="score" {title}>
	<div class="value" class:bounce={$bounce}><slot /></div>
	{#if textBurstItems && progressKey !== undefined}
		{#key progressKey}
			<div class="text-burst-wrapper">
				<TextBurst count={15} items={textBurstItems} xRadius={100} yRadius={100} />
			</div>
		{/key}
	{/if}
	<div class="apple" class:bounce={$bounce} />
</div>

<style>
	.score {
		display: flex;
		padding: var(--spacing_xl);
		align-items: center;
	}

	.value {
		padding: 0 var(--spacing_md);
		font-size: var(--size_xl3);
		font-weight: 600;
	}

	.text-burst-wrapper {
		position: relative;
		/* TODO center this properly */
		top: calc(var(--size_xl) / -2);
		width: 0;
		height: 0;
		font-size: var(--size_xl);
	}
</style>
