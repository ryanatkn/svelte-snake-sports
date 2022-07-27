import {randomInt} from '@feltcoop/felt/util/random.js';
import {browser} from '$app/env';
import {Entity, type Direction} from '$lib/Entity';
import type {SnakeGameState} from '$lib/SnakeGameState';

const MOVEMENT_COMMAND_QUEUE_SIZE = 4; // how many inputs a player can queue up at once

interface Position {
	x: number;
	y: number;
}

/**
 * Sets up the initial state for a game.
 */
export const initGameState = (state: SnakeGameState): void => {
	const {mapWidth, mapHeight} = state;
	console.log('[SnakeGame] init');
	// TODO BLOCK single state JSON object instead? update(state, controller) => nextState

	state.tickDuration = 1000; // TODO make configurable
	state.tickTimer = 0;
	state.score = 0;
	state.highScore = (browser && Number(localStorage.getItem('highScore'))) || 0; // clearly bad code to not be DRY - this whole module smells
	state.stats = 0;
	state.movementCommandQueue = ['up'];

	// Create the tiles.
	const nextTiles: Entity[] = [];
	for (let x = 0; x < mapWidth; x++) {
		for (let y = 0; y < mapHeight; y++) {
			nextTiles.push(new Entity({x, y}));
		}
	}
	state.tiles = nextTiles;

	// Create some apples, but preserve current identities if convenient.
	state.apples = [new Entity({x: 1, y: 3}), new Entity({x: 7, y: 2}), new Entity({x: 5, y: 9})];

	// Create the initial snake.
	state.snakeMovementDirection = 'up';
	state.snakeSegments = [
		new Entity({x: 4, y: 4}),
		new Entity({x: 4, y: 5}),
		new Entity({x: 5, y: 5}),
		new Entity({x: 5, y: 6}),
		new Entity({x: 5, y: 7}),
	];
};

/**
 * Finds the first entity at the given location. Ignores tile entities.
 * This would be more generic if the game handled entities generically,
 * but because of the small scope of this project I chose to a more explicit,
 * less flexible data structure.
 */
const findEntityAt = (state: SnakeGameState, x: number, y: number): Entity | void => {
	for (const a of state.apples) {
		if (a.isAt(x, y)) {
			return a;
		}
	}
	for (const s of state.snakeSegments) {
		if (s.isAt(x, y)) {
			return s;
		}
	}
};

/**
 * Returns {x, y} for a random empty tile on the game map.
 */
const getRandomEmptyLocation = (state: SnakeGameState): Position => {
	let position;
	while (!position || findEntityAt(state, position.x, position.y)) {
		position = getRandomLocation(state);
	}
	return position;
};

/**
 * Gets a random position on the game map.
 */
const getRandomLocation = ({mapWidth, mapHeight}: SnakeGameState): Position => ({
	x: randomInt(0, mapWidth - 1),
	y: randomInt(0, mapHeight - 1),
});

/**
 * Registers a movement input command to be processed by the game as a queue.
 * Newer commands bump off older ones off the front.
 */
export const inputMovementCommand = (state: SnakeGameState, movementCommand: Direction): void => {
	const {movementCommandQueue} = state;
	const nextMovementCommandQueue = [...movementCommandQueue, movementCommand];
	while (nextMovementCommandQueue.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
		nextMovementCommandQueue.shift();
	}
	state.movementCommandQueue = nextMovementCommandQueue;
};

/**
 * Sets the current score for the game, saving the best ever back to local storage.
 */
const setScore = (state: SnakeGameState, value: number): void => {
	state.score = value;
	if (value > state.highScore) {
		state.highScore = value;
		if (browser) localStorage.setItem('highScore', value + '');
	}
};

/**
 * Mutates the game by executing one full turn and handles all state changes that result.
 * The game may be in a temporarily illegal state at any time during this function,
 * like snake segments on top of other segments,
 * but it is expected to be in a fully valid state before and after the function.
 * Any potentially illegal states need to be checked and reconciled before the function ends.
 */
export const updateGameState = (state: SnakeGameState): SnakeGameState => {
	// TODO BLOCK need to have input/output from one state to the next, still using mutating functions so we can user Immer or not

	// Updates state like `game.snake.movementDirection` based on user input
	updateInput(state);

	// Update entities
	moveSnake(state);

	// Check for collision events and handle all possible game state changes.
	checkSnakeOutOfBounds(state);
	checkSnakeEatSelf(state);
	checkSnakeEatApple(state);

	return state;
};

/**
 * Update the snake's movement direction with the next input direction, if any.
 */
function updateInput(state: SnakeGameState): void {
	const {movementCommandQueue} = state;
	const movementCommand = movementCommandQueue.shift();
	if (movementCommand) {
		state.snakeMovementDirection = movementCommand;
	}
}

/**
 * Moves the snake in the given direction.
 */
function moveSnake({snakeSegments, snakeMovementDirection}: SnakeGameState): void {
	const head = snakeSegments[0];

	// Move the head first, because our algorithm reads the previous positions
	// of the preceding segments to move them to, so this works.
	head.moveDir(snakeMovementDirection);

	// Make the body follow the head
	for (let i = 1; i < snakeSegments.length; i++) {
		const prevSegment = snakeSegments[i - 1];
		const currSegment = snakeSegments[i];
		currSegment.moveTo(prevSegment.prevX, prevSegment.prevY);
	}
}

/**
 * We only need to check the head of the snake to see if the whole thing is in bounds
 * because of the game's movement rules.
 */
function checkSnakeOutOfBounds(state: SnakeGameState): void {
	const {snakeSegments, mapWidth, mapHeight} = state;
	if (snakeSegments[0].isOutOfBounds(mapWidth, mapHeight)) {
		destroySnake(state);
	}
}

/**
 * As the quickest possible thing, just reset the game state when the player dies.
 */
function destroySnake(state: SnakeGameState): void {
	// TODO increment a counter for history tracking
	state.stats++;
	initGameState(state);
}

/**
 * Checks if the snake eats itself. If so, destroy it.
 */
function checkSnakeEatSelf(state: SnakeGameState): void {
	const {snakeSegments} = state;
	const snakeHead = snakeSegments[0];
	for (const segment of snakeSegments) {
		if (segment !== snakeHead && segment.isCollidingWith(snakeHead)) {
			return destroySnake(state);
		}
	}
}

/**
 * Check if the snake eats an apple. If so, update the game state to handle it.
 */
function checkSnakeEatApple(state: SnakeGameState): void {
	const {snakeSegments, apples} = state;
	const snakeHead = snakeSegments[0];
	for (const apple of apples) {
		if (snakeHead.isCollidingWith(apple)) {
			return eatApple(state, apple);
		}
	}
}

/**
 * Has the snake eat an apple, removing the apple and growing the snake.
 */
function eatApple(state: SnakeGameState, apple: Entity): void {
	const {score, apples, snakeSegments} = state;

	// Increase the score!
	setScore(state, score + 1);

	// Remove the apple.
	apples.splice(apples.indexOf(apple), 1);

	// Create a new end tail segment that looks like the current end of the snake.
	const endTailSegment = snakeSegments.at(-1)!;
	const newEndTailSegment = endTailSegment.clone();

	// Position the new end tail segment at the previous position of the current end of the snake.
	newEndTailSegment.moveTo(endTailSegment.prevX, endTailSegment.prevY);
	snakeSegments.push(newEndTailSegment);
	spawnApple(state);
}

/**
 * Creates an apple on a random empty square.
 */
function spawnApple(state: SnakeGameState): void {
	const apple = new Entity(getRandomEmptyLocation(state));
	state.apples.push(apple);
}
