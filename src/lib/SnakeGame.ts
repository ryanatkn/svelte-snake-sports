import type {Writable} from 'svelte/store';

import type {Direction} from '$lib/Entity';

// TODO try to delete, only need it because `SnakeGame.svelte` can't be imported by TS modules

export interface ISnakeGame {
	events: Writable<SnakeGameEvent[]>;
	baseTickDuration: Writable<number>;
	currentTickDuration: Writable<number>;
	snakeMovementDirection: Writable<Direction>;
	movementCommandQueue: Writable<Direction[]>;
	highScore: Writable<number>;
	runCount: Writable<number>;
	emit: (event: SnakeGameEvent) => void;
	reset: () => void;
	enqueueMovementCommand: (movementCommand: Direction) => void;
	setMovementCommand: (movementCommand: Direction) => void;
}

export type SnakeGameEvent = SnakeGameWinEvent | SnakeGameFailEvent;

export interface SnakeGameWinEvent {
	type: 'win_stage';
}

export interface SnakeGameFailEvent {
	type: 'damage_snake';
}
