import type {Entity} from '$lib/Entity';

// TODO maybe change this to be `toJson` and `fromJson` on `SnakeGame.svelte`?
export interface SnakeGameState {
	mapWidth: number; // tile count x
	mapHeight: number; // tile count y
	score: number; // how many apples have been eaten
	winningScore: number | null; // TODO better name? how many apples need to be eaten to win
	tiles: Entity[]; // TODO probably don't need these to be entities
	apples: Entity[];
	snakeSegments: Entity[];
}

export const toDefaultGameState = (): SnakeGameState => ({
	mapWidth: 16,
	mapHeight: 16,
	score: 0,
	winningScore: null,
	tiles: [],
	apples: [],
	snakeSegments: [],
});
