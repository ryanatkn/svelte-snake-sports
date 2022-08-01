<script lang="ts">
	export let score: number;
</script>

<div class="Score">
	<div class="value">{score}</div>
	<div class="apple" />
</div>

<style>
	.Score {
		display: flex;
		padding: var(--spacing_xl);
		align-items: center;
	}

	.value {
		padding: 0 var(--spacing_lg);
		font-size: var(--font_size_xl3);
	}
</style>
