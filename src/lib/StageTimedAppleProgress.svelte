<script lang="ts">
	export let applesEaten: number;
	export let applesToWin: number;
	export let timer: number;

	$: timerSeconds = Math.floor(timer / 1000);
</script>

<div class="progress">
	<div class="count" title="progress towards goal">
		<div>{applesEaten} / {applesToWin}</div>
		<div class="apple" />
	</div>

	<div class="timer" title="elapsed time in seconds">{timerSeconds}s</div>
</div>

<style>
	.progress {
		display: flex;
		padding: var(--spacing_xl);
		align-items: center;
		font-size: var(--font_size_xl3);
	}

	.count {
		display: flex;
		align-items: center;
		padding: 0 var(--spacing_lg);
	}
	.apple {
		margin-left: var(--spacing_xl);
	}

	.timer {
		margin-left: var(--spacing_xl7);
	}
</style>
