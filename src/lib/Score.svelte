<script lang="ts">
	import type {SnakeGameState} from './SnakeGameState';

	export let state: SnakeGameState;

	$: ({score} = state);
</script>

<div class="Score">
	<div class="value">{score}</div>
	<div class="apple" />
</div>

<style>
	.Score {
		display: flex;
		padding: var(--spacing_xl);
	}

	.value {
		padding: 0 5px;
		font-size: var(--font_size_xl);
		font-weight: 700;
	}

	.apple {
		position: relative;
		background-color: #c89;
		border-radius: 17px 14px 12px 10px;
		animation: pop-in 0.66s ease-in-out;
		width: 30px;
		height: 30px;
	}

	.apple:after {
		content: '';
		display: block;
		position: absolute;
		left: 13px;
		top: -3px;
		width: 3px;
		height: 7px;
		background-color: rgba(122, 100, 100, 0.8);
		border-radius: 4px;
	}
</style>
