import {browser} from '$app/env';
import type {Entity} from '$lib/Entity';

export interface SnakeGameState {
	mapWidth: number; // tile count x
	mapHeight: number; // tile count y
	tickDuration: number; // ms per tick
	tickTimer: number; // current tick timer
	score: number; // how many apples have been eaten
	highScore: number;
	stats: number; // currently just stores a run count
	tiles: Entity[];
	apples: Entity[];
	snakeSegments: Entity[];
}

export const toDefaultGameState = (): SnakeGameState => ({
	mapWidth: 16,
	mapHeight: 16,
	tickDuration: 1000,
	tickTimer: 0,
	score: 0,
	highScore: (browser && Number(localStorage.getItem('highScore'))) || 0,
	stats: (browser && Number(localStorage.getItem('stats'))) || 0,
	tiles: [],
	apples: [],
	snakeSegments: [],
});
