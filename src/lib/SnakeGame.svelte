<svelte:options accessors />

<script lang="ts">
	import {writable} from 'svelte/store';
	import {noop} from '@feltcoop/util/function.js';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import type {SnakeGameEvent, SnakeGameHelpers} from '$lib/SnakeGame';
	import {spawnApples as _spawnApples} from '$lib/updateSnakeGameState';
	import {areOpposites, toDirection, type Direction} from '$lib/direction';

	export let storageKey: string;
	storageKey; // TODO disabling with eslint isn't working

	export let toInitialState: () => SnakeGameState;
	export let toInitialEvents: () => SnakeGameEvent[] = () => [];
	export let toInitialMovementDirection: () => Direction | null = () => null;
	export let shouldStart = (): boolean => true;
	export let tick: () => boolean;
	export let onReset: () => void = noop;
	export let spawnApples: typeof _spawnApples | undefined = undefined;

	// this prop gets set by `beginUpdate`, but it's exposed for binding externally
	export let prevState: SnakeGameState | undefined = undefined;

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
		prevState = undefined;
		onReset();
		$state = toInitialState();
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

	const toPreviousDirection = (): Direction | undefined => {
		const queued = $movementCommandQueue.at(-1);
		if (queued) return queued;
		const snakeHead = $state.snakeSegments[0];
		return toDirection(snakeHead.prevX, snakeHead.prevY, snakeHead.x, snakeHead.y);
	};

	/**
	 * Registers a movement input command to be processed by the game as a queue.
	 * Newer commands bump off older ones off the front.
	 * Sequential commands that are opposites are discarded.
	 */
	export const enqueueMovementCommand = (movementCommand: Direction): void => {
		const prev = toPreviousDirection();
		if (prev !== undefined && areOpposites(prev, movementCommand)) {
			return; // ignore sequential commands that are opposites
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
		if ($movementCommandQueue.length) $movementCommandQueue = [];
		enqueueMovementCommand(movementCommand);
	};

	export const resetMovementCommands = (): void => {
		$movementDirection = null;
		if ($movementCommandQueue.length) $movementCommandQueue = [];
	};

	export const nextMovementCommand = (): Direction | null => {
		if ($movementCommandQueue.length) {
			const next = $movementCommandQueue.slice();
			$movementDirection = next.shift()!;
			$movementCommandQueue = next;
		}
		return $movementDirection;
	};

	export const handlePointerInput = (
		snakeScreenX: number,
		snakeScreenY: number,
		pointerX: number,
		pointerY: number,
	): void => {
		const prev = toPreviousDirection();
		let movementCommand = toDirection(snakeScreenX, snakeScreenY, pointerX, pointerY);
		if (!movementCommand) return; // ignore in the case the pointer is exactly the snake position
		if (prev !== undefined && areOpposites(prev, movementCommand)) {
			// The input is opposite the previous direction, so move towards it.
			if (movementCommand === 'up' || movementCommand === 'down') {
				movementCommand = pointerX > snakeScreenX ? 'right' : 'left';
			} else {
				movementCommand = pointerY < snakeScreenY ? 'up' : 'down';
			}
		}
		setMovementCommand(movementCommand);
	};
</script>
