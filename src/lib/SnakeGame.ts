import type {Writable} from 'svelte/store';

import type {Direction, Entity} from '$lib/Entity';

// TODO try to delete, only need it because `SnakeGame.svelte` can't be imported by TS modules

export interface ISnakeGame {
	events: Writable<SnakeGameEvent[]>;
	snakeMovementDirection: Writable<Direction>;
	movementCommandQueue: Writable<Direction[]>;
	runCount: Writable<number>;
	emit: (event: SnakeGameEvent) => void;
	reset: () => void;
	enqueueMovementCommand: (movementCommand: Direction) => void;
	setMovementCommand: (movementCommand: Direction) => void;
}

export type SnakeGameEvent =
	| SnakeGameSnakeCollideBoundsEvent
	| SnakeGameSnakeCollideSelfEvent
	| SnakeGameEatAppleEvent;

export interface SnakeGameSnakeCollideBoundsEvent {
	name: 'snake_collide_bounds';
}

export interface SnakeGameSnakeCollideSelfEvent {
	name: 'snake_collide_self';
	segment: Entity;
}

export interface SnakeGameEatAppleEvent {
	name: 'eat_apple';
	apple: Entity;
}
