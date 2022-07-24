import {initGameState} from './initGameState';
import {Entity, type Direction} from '../models/Entity';
import type {GameState, SnakeState} from '../models/GameState';

/**
 * Updates the game simulation. Game turns are taken when the `tickTimer` runs out.
 */
export const updateGame = (game: GameState, dt: number): void => {
	game.tickTimer += dt;

	// Slowly reduce the turn duration to make the game faster and more difficult with time.
	game.tickDuration *= 0.9999;

	if (game.tickTimer >= game.tickDuration) {
		tick(game);
		game.tickTimer = 0;
	}
};

/**
 * Mutates the game by executing one full turn and handles all state changes that result.
 * The game may be in a temporarily illegal state at any time during this function,
 * like snake segments on top of other segments,
 * but it is expected to be in a fully valid state before and after the function.
 * Any potentially illegal states need to be checked and reconciled before the function ends.
 */
function tick(game: GameState): void {
	// Updates state like `game.snake.movementDirection` based on user input
	updateInput(game);

	// Update entities
	moveSnake(game.snake, game.snake.movementDirection);

	// Check for collision events and handle all possible game state changes.
	checkSnakeOutOfBounds(game);
	checkSnakeEatSelf(game);
	checkSnakeEatApple(game);
}

/**
 * Update the snake's movement direction with the next input direction, if any.
 */
function updateInput(game: GameState): void {
	const movementCommand = game.input.movementCommands.shift();
	if (movementCommand) {
		game.snake.movementDirection = movementCommand;
	}
}

/**
 * Moves the snake in the given direction.
 */
function moveSnake(snake: SnakeState, movementCommand: Direction): void {
	const head = snake.segments[0];

	// Move the head first, because our algorithm reads the previous positions
	// of the preceding segments to move them to, so this works.
	head.moveDir(movementCommand);

	// Make the body follow the head
	for (let i = 1; i < snake.segments.length; i++) {
		const prevSegment = snake.segments[i - 1];
		const currSegment = snake.segments[i];
		currSegment.moveTo(prevSegment.prevX, prevSegment.prevY);
	}
}

/**
 * We only need to check the head of the snake to see if the whole thing is in bounds
 * because of the game's movement rules.
 */
function checkSnakeOutOfBounds(game: GameState): void {
	if (game.snake.segments[0].isOutOfBounds(game.mapWidth, game.mapHeight)) {
		killSnake(game);
	}
}

/**
 * As the quickest possible thing, just reset the game state when the player dies.
 */
function killSnake(game: GameState): void {
	initGameState(game);
}

/**
 * Checks if the snake eats itself. If so, kill it.
 */
function checkSnakeEatSelf(game: GameState): void {
	const snakeHead = game.snake.segments[0];
	for (const segment of game.snake.segments) {
		if (segment !== snakeHead && segment.isCollidingWith(snakeHead)) {
			return killSnake(game);
		}
	}
}

/**
 * Check if the snake eats an apple. If so, update the game state to handle it.
 */
function checkSnakeEatApple(game: GameState): void {
	const snakeHead = game.snake.segments[0];
	for (const apple of game.apples) {
		if (snakeHead.isCollidingWith(apple)) {
			return eatApple(game, apple);
		}
	}
}

/**
 * Has the snake eat an apple, removing the apple and growing the snake.
 */
function eatApple(game: GameState, apple: Entity): void {
	// Increase the score!
	game.setScore(game.score + 1);

	// Remove the apple.
	game.apples.splice(game.apples.indexOf(apple), 1);

	// Create a new end tail segment that looks like the current end of the snake.
	const endTailSegment = game.snake.segments.at(-1)!;
	const newEndTailSegment = endTailSegment.clone();

	// Position the new end tail segment at the previous position of the current end of the snake.
	newEndTailSegment.moveTo(endTailSegment.prevX, endTailSegment.prevY);
	game.snake.segments.push(newEndTailSegment);
	spawnApple(game);
}

/**
 * Creates an apple on a random empty square.
 */
function spawnApple(game: GameState): void {
	const {x, y} = game.getRandomEmptyLocation();
	const apple = new Entity(x, y);
	game.apples.push(apple);
}
