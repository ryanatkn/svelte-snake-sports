<svelte:options immutable={false} />

<script lang="ts">
	import {browser} from '$app/env';
	import type {Direction} from '$lib/Entity';
	import {writable} from 'svelte/store';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import {swallow} from '@feltcoop/felt/util/dom.js';

	// TODO BLOCK add state store?
	export let state: SnakeGameState;
	export let tick: () => void;

	export const snakeMovementDirection = writable<Direction>('up');
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?
	export const highScore = writable<number>(
		(browser && Number(localStorage.getItem('highScore'))) || 0,
	);
	export const runCount = writable<number>(0);

	export const reset = (): void => {
		$snakeMovementDirection = 'up';
		$movementCommandQueue = [];
	};

	$: ({score} = state);

	$: console.log(`score`, score);

	// TODO is there a better place to do this? imperatively after updating the state?
	$: if (score > $highScore) {
		console.log(`score`, score);
		$highScore = score;
		if (browser) localStorage.setItem('highScore', score + ''); // TODO use helper on store instead
	}

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

	const updateKeyDown = (key: string, shiftKey: boolean, ctrlKey: boolean): boolean => {
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
				return true;
			case 'ArrowDown':
			case 's':
			case 'j':
				if (ctrlKey || shiftKey) {
					setMovementCommand('down');
					tick();
				} else {
					enqueueMovementCommand('down');
				}
				return true;
			case 'ArrowLeft':
			case 'a':
			case 'h':
				if (ctrlKey || shiftKey) {
					setMovementCommand('left');
					tick();
				} else {
					enqueueMovementCommand('left');
				}
				return true;
			case 'ArrowRight':
			case 'd':
			case 'l':
				if (ctrlKey || shiftKey) {
					setMovementCommand('right');
					tick();
				} else {
					enqueueMovementCommand('right');
				}
				return true;
		}
		return false;
	};
</script>

<svelte:body
	on:keydown={(e) => {
		if (updateKeyDown(e.key, e.shiftKey, e.ctrlKey)) {
			swallow(e);
		}
	}} />
