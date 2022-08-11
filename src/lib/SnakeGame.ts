import type {Writable} from 'svelte/store';

import type {Direction, Entity} from '$lib/Entity';
import type {spawnApples} from '$lib/updateSnakeGameState';
import type {SnakeGameState} from '$lib/SnakeGameState';

// TODO try to delete, only need it because
// `SnakeGame.svelte` types in `context="module"` can't be imported by TS modules

export interface ISnakeGame {
	prevState: SnakeGameState | undefined;
	events: Writable<SnakeGameEvent[]>;
	movementDirection: Writable<Direction | null>;
	movementCommandQueue: Writable<Direction[]>;
	runCount: Writable<number>;
	emit: (event: SnakeGameEvent) => void;
	reset: () => void;
	enqueueMovementCommand: (movementCommand: Direction) => void;
	setMovementCommand: (movementCommand: Direction) => void;
	end: (outcomeStatus: 'win' | 'fail') => void;
	beginUpdate: (state: SnakeGameState) => SnakeGameState;
	helpers: SnakeGameHelpers;
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

export interface SnakeGameHelpers {
	spawnApples: typeof spawnApples;
}
