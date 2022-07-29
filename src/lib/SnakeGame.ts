import type {Writable} from 'svelte/store';

import type {Direction} from '$lib/Entity';

// TODO try to delete, only need it because `SnakeGame.svelte` can't be imported by TS modules

export interface ISnakeGame {
	baseTickDuration: Writable<number>;
	currentTickDuration: Writable<number>;
	snakeMovementDirection: Writable<Direction>;
	movementCommandQueue: Writable<Direction[]>;
	highScore: Writable<number>;
	runCount: Writable<number>;
	reset: () => void;
	enqueueMovementCommand: (movementCommand: Direction) => void;
	setMovementCommand: (movementCommand: Direction) => void;
}
