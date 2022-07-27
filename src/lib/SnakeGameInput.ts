import type {Writable} from 'svelte/store';

import type {Direction} from '$lib/Entity';

// TODO where should this live?

export interface SnakeGameInput {
	snakeMovementDirection: Writable<Direction>;
	movementCommandQueue: Writable<Direction[]>;
}
