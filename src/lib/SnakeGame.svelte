<script lang="ts">
	import type {Direction} from '$lib/Entity';
	import {writable} from 'svelte/store';

	export let tick: () => void;

	export const snakeMovementDirection = writable<Direction>('up');
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?

	export const reset = (): void => {
		$snakeMovementDirection = 'up';
		$movementCommandQueue = [];
	};

	const MOVEMENT_COMMAND_QUEUE_SIZE = 4; // how many inputs a player can queue up at once

	/**
	 * Registers a movement input command to be processed by the game as a queue.
	 * Newer commands bump off older ones off the front.
	 */
	export const enqueueMovementCommand = (movementCommand: Direction): void => {
		movementCommandQueue.update(($v) => {
			const $updated = [...$v, movementCommand];
			while ($updated.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
				$updated.shift();
			}
			return $updated;
		});
	};

	export const setMovementCommand = (movementCommand: Direction): void => {
		$movementCommandQueue = [movementCommand];
	};

	const updateKeyDown = (key: string, shiftKey: boolean, ctrlKey: boolean): void => {
		switch (key) {
			case 'ArrowUp':
			case 'w':
			case 'k':
				if (ctrlKey || shiftKey) {
					setMovementCommand('up');
					tick();
				} else {
					enqueueMovementCommand('up');
				}
				break;
			case 'ArrowDown':
			case 's':
			case 'j':
				if (ctrlKey || shiftKey) {
					setMovementCommand('down');
					tick();
				} else {
					enqueueMovementCommand('down');
				}
				break;
			case 'ArrowLeft':
			case 'a':
			case 'h':
				if (ctrlKey || shiftKey) {
					setMovementCommand('left');
					tick();
				} else {
					enqueueMovementCommand('left');
				}
				break;
			case 'ArrowRight':
			case 'd':
			case 'l':
				if (ctrlKey || shiftKey) {
					setMovementCommand('right');
					tick();
				} else {
					enqueueMovementCommand('right');
				}
				break;
			default:
				break;
		}
	};
</script>

<svelte:body
	on:keydown={(e) => {
		updateKeyDown(e.key, e.shiftKey, e.ctrlKey);
	}} />
