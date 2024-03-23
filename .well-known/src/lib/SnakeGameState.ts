import type {Entity} from '$lib/Entity';

// TODO maybe change this to be `toJson` and `fromJson` on `SnakeGame.svelte`?
export interface SnakeGameState {
	mapWidth: number; // tile count x
	mapHeight: number; // tile count y
	apples: Entity[];
	snakeSegments: Entity[];
}

export const toDefaultGameState = ({
	mapWidth = 16,
	mapHeight = 16,
	apples = [],
	snakeSegments = [],
}: Partial<SnakeGameState> = {}): SnakeGameState => ({
	mapWidth,
	mapHeight,
	apples,
	snakeSegments,
});
