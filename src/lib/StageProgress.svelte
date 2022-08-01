<script lang="ts">
	export let score: number;
	export let winningScore: number;

	$: pct = score / winningScore;
</script>

<div class="Score">
	<div class="apple" style:transform="translate3d({pct}%, 0, 0)" />
	<div class="value">{score} / {winningScore}</div>
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
