import {browser} from '$app/env';
import {Entity} from '../models/Entity';
import type {GameState} from '../models/GameState';

/**
 * Sets up the initial state for a game.
 */
export const initGameState = (game: GameState): void => {
	game.tickDuration = 120;
	game.tickTimer = 0;
	game.score = 0;
	game.highScore = (browser && Number(localStorage.getItem('game.highScore'))) || 0; // clearly bad code to not be DRY - this whole module smells
	game.input.movementCommands = ['up'];

	// Create the tiles.
	game.tiles.length = 0;
	for (let x = 0; x < game.mapWidth; x++) {
		for (let y = 0; y < game.mapWidth; y++) {
			game.tiles.push(new Entity(x, y));
		}
	}

	// Create some apples, but preserve current identities if convenient.
	if (game.apples.length !== 3) {
		game.apples.length = 0;
		game.apples.push(new Entity(0, 0));
		game.apples.push(new Entity(0, 0));
		game.apples.push(new Entity(0, 0));
	}
	game.apples[0].moveTo(1, 3);
	game.apples[1].moveTo(7, 2);
	game.apples[2].moveTo(5, 9);

	// Create the initial snake.
	game.snake.movementDirection = 'up';
	game.snake.segments.length = 0;
	game.snake.segments.push(new Entity(4, 4));
	game.snake.segments.push(new Entity(4, 5));
	game.snake.segments.push(new Entity(5, 5));
	game.snake.segments.push(new Entity(5, 6));
	game.snake.segments.push(new Entity(5, 7));
};
