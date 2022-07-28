<script lang="ts">
	import type {Direction} from '$lib/Entity';
	import {writable} from 'svelte/store';

	export const snakeMovementDirection = writable<Direction>('up');
	export const movementCommandQueue = writable<Direction[]>([]);

	export const reset = (): void => {
		$snakeMovementDirection = 'up';
		$movementCommandQueue = [];
	};

	const MOVEMENT_COMMAND_QUEUE_SIZE = 4; // how many inputs a player can queue up at once

	/**
	 * Registers a movement input command to be processed by the game as a queue.
	 * Newer commands bump off older ones off the front.
	 */
	export const inputMovementCommand = (movementCommand: Direction): void => {
		movementCommandQueue.update(($v) => {
			const $updated = [...$v, movementCommand];
			while ($updated.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
				$updated.shift();
			}
			return $updated;
		});
	};

	const updateKeyDown = (key: string): void => {
		switch (key) {
			case 'ArrowUp':
			case 'w':
			case 'k':
				inputMovementCommand('up');
				break;
			case 'ArrowDown':
			case 's':
			case 'j':
				inputMovementCommand('down');
				break;
			case 'ArrowLeft':
			case 'a':
			case 'h':
				inputMovementCommand('left');
				break;
			case 'ArrowRight':
			case 'd':
			case 'l':
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
