<script lang="ts">
	import TextBurst from '$lib/TextBurst.svelte';

	export let title = 'score';
	export let textBurstItems: string[] | null = ['🍎', '🍏'];
	export let textBurstKey: any = undefined;
</script>

<div class="score" {title}>
	<div class="value"><slot /></div>
	{#if textBurstItems && textBurstKey}
		{#key textBurstKey}
			<div class="text-burst-wrapper">
				<TextBurst count={15} items={textBurstItems} xRadius={100} yRadius={100} />
			</div>
		{/key}
	{/if}
	<div class="apple" />
</div>

<style>
	.score {
		display: flex;
		padding: var(--spacing_xl);
		align-items: center;
	}

	.value {
		padding: 0 var(--spacing_lg);
		font-size: var(--font_size_xl3);
	}

	.text-burst-wrapper {
		position: relative;
		/* TODO center this properly */
		top: calc(var(--font_size_xl) / -2);
		width: 0;
		height: 0;
		font-size: var(--font_size_xl);
	}
</style>
