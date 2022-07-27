<script lang="ts">
	import type {Direction} from '$lib/Entity';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import {writable} from 'svelte/store';
	import type {SnakeGameInput} from '$lib/SnakeGameInput';

	export let state: SnakeGameState;
	export let initGameState: (state: SnakeGameState) => void;

	initGameState(state);

	export const snakeMovementDirection = writable<Direction>('up');
	export const movementCommandQueue = writable<Direction[]>([]);
	// TODO probably remove this?
	export const input: SnakeGameInput = {
		snakeMovementDirection,
		movementCommandQueue,
	};

	const MOVEMENT_COMMAND_QUEUE_SIZE = 4; // how many inputs a player can queue up at once

	/**
	 * Registers a movement input command to be processed by the game as a queue.
	 * Newer commands bump off older ones off the front.
	 */
	export const inputMovementCommand = (movementCommand: Direction): void => {
		const nextMovementCommandQueue = [...$movementCommandQueue, movementCommand];
		while (nextMovementCommandQueue.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
			nextMovementCommandQueue.shift();
		}
		$movementCommandQueue = nextMovementCommandQueue;
	};

	const updateKeyDown = (key: string): void => {
		switch (key) {
			case 'ArrowUp':
				inputMovementCommand('up');
				break;
			case 'ArrowDown':
				inputMovementCommand('down');
				break;
			case 'ArrowLeft':
				inputMovementCommand('left');
				break;
			case 'ArrowRight':
				inputMovementCommand('right');
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
