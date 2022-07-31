import type {Entity} from '$lib/Entity';

// TODO maybe change this to be `toJson` and `fromJson` on `SnakeGame.svelte`?
export interface SnakeGameState {
	mapWidth: number; // tile count x
	mapHeight: number; // tile count y
	// TODO BLOCK does this belong on the state? or the game?
	score: number; // how many apples have been eaten
	// TODO BLOCK maybe wrap this with a different property: `victory` -- `{score: number} | {time: number} | {turns: number} | null`
	winningScore: number | null; // TODO better name? how many apples need to be eaten to win
	apples: Entity[];
	snakeSegments: Entity[];
}

export const toDefaultGameState = ({
	mapWidth = 16,
	mapHeight = 16,
	score = 0,
	winningScore = null,
	apples = [],
	snakeSegments = [],
}: Partial<SnakeGameState> = {}): SnakeGameState => ({
	mapWidth,
	mapHeight,
	score,
	winningScore,
	apples,
	snakeSegments,
});
