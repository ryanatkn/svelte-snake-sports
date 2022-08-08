<svelte:options immutable={false} accessors />

<script lang="ts">
	import {writable} from 'svelte/store';
	import {noop} from '@feltcoop/felt/util/function.js';
	import type {Direction} from '$lib/Entity';
	import {spawnApples} from '$lib/mutableSnakeGameState';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import type {SnakeGameEvent, SnakeGameHelpers} from '$lib/SnakeGame';

	export let toInitialState: () => SnakeGameState;
	export let toInitialEvents: () => SnakeGameEvent[] = () => [];
	export let toInitialMovementDirection: () => Direction | null = () => null;
	export let shouldStart = (): boolean => true;
	export let tick: () => boolean;
	export let onReset: () => void = noop;
	// TODO BLOCK maybe we should go with a simpler design? export each helper separately?
	// the downside of that is each game impl would have to redeclare all of them to support composition from parents.
	// Instead if we have a single `helpers` object, it could be extended/composed from a single declaration at each level.
	// TODO BLOCK this is causing type errors because `undefined` is a valid value for it because it's a prop
	export let helpers: SnakeGameHelpers = {spawnApples};

	export const state = writable(toInitialState());
	export const events = writable(toInitialEvents());
	export const tickCount = writable(0); // the starting tick duration, may be modified by gameplay
	export const movementDirection = writable<Direction | null>(toInitialMovementDirection());
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?
	export const runCount = writable(0);
	export const status = writable<'ready' | 'playing' | 'win' | 'fail'>('ready');

	// TODO I'm not sure about *any* of these -- might need to heavily refactor, add hooks, etc

	export const nextTick = (): void => {
		if (tick()) $tickCount++;
	};

	export const reset = (): void => {
		$status = 'ready';
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

	export const end = (outcomeStatus: 'win' | 'fail'): void => {
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
