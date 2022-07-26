<script lang="ts">
	import type {Clock} from './clock';
	import type {Direction} from './Entity';
	import type {SnakeGameState} from './SnakeGameState';
	import Ticker from './Ticker.svelte';

	export let clock: Clock;
	export let state: SnakeGameState;
	export let initGameState: (state: SnakeGameState) => void;
	export let updateGameState: (state: SnakeGameState) => void;
	export let inputMovementCommand: (state: SnakeGameState, movementCommand: Direction) => void;

	initGameState(state);

	const updateKeyDown = (key: string): void => {
		switch (key) {
			case 'ArrowUp':
				inputMovementCommand(state, 'up');
				break;
			case 'ArrowDown':
				inputMovementCommand(state, 'down');
				break;
			case 'ArrowLeft':
				inputMovementCommand(state, 'left');
				break;
			case 'ArrowRight':
				inputMovementCommand(state, 'right');
				break;
			default:
				break;
		}
	};
</script>

<svelte:body
	on:keydown={(e) => {
		updateKeyDown(e.key);
	}} />

<Ticker {clock} tick={(_dt) => updateGameState(state)} />
