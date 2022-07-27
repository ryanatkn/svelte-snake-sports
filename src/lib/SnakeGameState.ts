import {browser} from '$app/env';
import type {Direction, EntityState} from '$lib/Entity';

export interface SnakeGameState {
	mapWidth: number; // tile count x
	mapHeight: number; // tile count y
	tickDuration: number; // ms per tick
	tickTimer: number; // current tick timer
	score: number; // how many apples have been eaten
	highScore: number;
	tiles: EntityState[];
	apples: EntityState[];
	snakeSegments: EntityState[];
	snakeMovementDirection: Direction;
	movementCommandQueue: Direction[]; // queue of inputs, ('up'|'down'|'left'|'right')[]
}

export const toDefaultGameState = (): SnakeGameState => ({
	mapWidth: 16,
	mapHeight: 16,
	tickDuration: 1000,
	tickTimer: 0,
	score: 0,
	highScore: (browser && Number(localStorage.getItem('highScore'))) || 0,
	tiles: [],
	apples: [],
	snakeMovementDirection: 'up',
	snakeSegments: [],
	movementCommandQueue: [],
});
