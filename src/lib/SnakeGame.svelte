<svelte:options accessors />

<script lang="ts">
	import {writable} from 'svelte/store';
	import {noop} from '@feltcoop/felt/util/function.js';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import type {SnakeGameEvent, SnakeGameHelpers} from '$lib/SnakeGame';
	import {spawnApples as _spawnApples} from '$lib/updateSnakeGameState';
	import {areOpposites, toDirection, type Direction} from '$lib/direction';

	export let toInitialState: () => SnakeGameState;
	export let toInitialEvents: () => SnakeGameEvent[] = () => [];
	export let toInitialMovementDirection: () => Direction | null = () => null;
	export let shouldStart = (): boolean => true;
	export let tick: () => boolean;
	export let onReset: () => void = noop;
	export let spawnApples: typeof _spawnApples | undefined = undefined;

	// this prop gets set by `beginUpdate`, but it's exposed for binding externally
	export let prevState: SnakeGameState | undefined = undefined;
	prevState; // TODO eslint borked

	export const state = writable(toInitialState());
	export const events = writable(toInitialEvents());
	export const helpers: SnakeGameHelpers = {
		spawnApples: _spawnApples,
	};
	export const tickCount = writable(0); // the starting tick duration, may be modified by gameplay
	export const movementDirection = writable<Direction | null>(toInitialMovementDirection());
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?
	export const runCount = writable(0);
	export const status = writable<'ready' | 'playing' | 'win' | 'fail'>('ready');

	export const beginUpdate = (state: SnakeGameState): SnakeGameState => {
		$events = [];
		prevState = state;
		return {...state};
	};

	// TODO this is super hacky -- the problem is that when Svelte props have a default value,
	// their external type is `T | undefined`,
	// so `export let spawnApples = _spawnApples;` doesn't work as intended
	$: if (spawnApples) helpers.spawnApples = spawnApples;

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
		prevState = undefined;
		onReset();
	};

	export const emit = (event: SnakeGameEvent): void => {
		$events.push(event); // mutate during updates
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
		const snakeHead = $state.snakeSegments[0];
		const prev =
			$movementCommandQueue.at(-1) ||
			toDirection(snakeHead.prevX, snakeHead.prevY, snakeHead.x, snakeHead.y);
		if (prev !== undefined && areOpposites(prev, movementCommand)) {
			return;
		}
		movementCommandQueue.update(($v) => {
			const $updated = $v.concat(movementCommand);
			while ($updated.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
				$updated.shift();
			}
			return $updated;
		});
	};

	export const setMovementCommand = (movementCommand: Direction): void => {
		// TODO is mutating here ok? I think better so we don't process the in-between state?
		$movementCommandQueue.length = 0;
		enqueueMovementCommand(movementCommand);
	};
</script>
