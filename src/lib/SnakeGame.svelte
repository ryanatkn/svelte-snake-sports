<svelte:options immutable={false} />

<script lang="ts">
	import {writable} from 'svelte/store';
	import {noop} from '@feltcoop/felt/util/function.js';
	import type {Direction} from '$lib/Entity';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import type {SnakeGameEvent} from '$lib/SnakeGame';

	export let toInitialState: () => SnakeGameState;
	export let toInitialEvents: () => SnakeGameEvent[] = () => [];
	export let toInitialMovementDirection: () => Direction | null = () => null;
	export let shouldStart = (): boolean => true;
	export let tick: () => boolean;
	export let onReset: () => void = noop;

	export const state = writable(toInitialState());
	export const events = writable(toInitialEvents());
	export const tickCount = writable(0); // the starting tick duration, may be modified by gameplay
	export const movementDirection = writable<Direction | null>(toInitialMovementDirection());
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?
	export const runCount = writable(0);
	export const status = writable<'initial' | 'playing' | 'success' | 'failure'>('initial');

	// TODO I'm not sure about *any* of these methods.

	export const nextTick = (): void => {
		if (tick()) $tickCount++;
	};

	export const reset = (): void => {
		$status = 'initial';
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
	export const start = (): boolean => {
		if ($status === 'playing' || !shouldStart()) {
			return false;
		}
		$status = 'playing';
		return true;
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
