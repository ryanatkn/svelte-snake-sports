<svelte:options immutable={false} />

<script lang="ts">
	import {writable} from 'svelte/store';
	import {noop} from '@feltcoop/felt/util/function.js';
	import type {Direction} from '$lib/Entity';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import Hotkeys from '$lib/Hotkeys.svelte';
	import type {SnakeGameEvent} from '$lib/SnakeGame';

	export let toInitialState: () => SnakeGameState;
	export let toInitialEvents: () => SnakeGameEvent[] = () => [];
	export let toInitialMovementDirection: () => Direction | null = () => 'up';
	export let shouldTick = (): boolean => true;
	export let tick: () => void; // TODO maybe rename to `onTick` or `onTurn`?
	export let onReset: () => void = noop;

	export const state = writable(toInitialState());
	export const events = writable(toInitialEvents());
	export const tickCount = writable(0); // the starting tick duration, may be modified by gameplay
	// TODO BLOCK should these two be hoisted? "tick duration" seems like an external concern, right?
	// given that `Ticker` is external, seems so?

	export const movementDirection = writable<Direction | null>(toInitialMovementDirection());
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?
	export const runCount = writable(0);
	export const status = writable<'initial' | 'success' | 'failure'>('initial');

	export const nextTick = (): void => {
		if (!shouldTick()) return;
		tick();
		$tickCount++;
	};

	export const reset = (): void => {
		$events = [];
		$tickCount = 0;
		$movementDirection = toInitialMovementDirection();
		$movementCommandQueue = [];
		$runCount++;
		$state = toInitialState();
		onReset();
	};

	export const emit = (event: SnakeGameEvent): void => {
		events.update(($v) => $v.concat(event));
	};

	export const end = (outcomeStatus: 'success' | 'failure'): void => {
		$status = outcomeStatus;
	};
	export const start = (): void => {
		if ($status === 'initial') return;
		$status = 'initial';
		reset();
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
</script>

<Hotkeys
	onKeydown={(key, shiftKey, ctrlKey) => {
		switch (key) {
			case 'ArrowUp':
			case 'w':
			case 'k':
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event? should this be called on any key?
				// TODO BLOCK should it bail if the event doesn't change the status? `if ($status === 'initial') return;`
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
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event?
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
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event?
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
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event?
				if (ctrlKey || shiftKey) {
					setMovementCommand('right');
					tick();
				} else {
					enqueueMovementCommand('right');
				}
				return true;
		}
		return false;
	}}
/>
