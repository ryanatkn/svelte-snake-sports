<script lang="ts">
	export let title = 'score';
</script>

<div class="score" {title}>
	<div class="value"><slot /></div>
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
</style>
