import {randomInt} from '@feltcoop/felt/util/random.js';
import {Entity, type Direction} from '$lib/Entity';
import type {SnakeGameState} from '$lib/SnakeGameState';
import {get} from 'svelte/store';
import type {ISnakeGame} from '$lib/SnakeGame';

// TODO refactor this -- into what? a component?

interface Position {
	x: number;
	y: number;
}

/**
 * Sets up the initial state for a game.
 */
export const initGameState = (state: SnakeGameState): SnakeGameState => {
	console.log('[SnakeGame] init');
	// TODO  single state JSON object instead? update(state, controller) => nextState

	state.score = 0;

	// Create some apples, but preserve current identities if convenient.
	state.apples = [new Entity({x: 1, y: 3}), new Entity({x: 7, y: 2}), new Entity({x: 5, y: 9})];

	// Create the initial snake.
	state.snakeSegments = [
		new Entity({x: 4, y: 4}),
		new Entity({x: 4, y: 5}),
		new Entity({x: 5, y: 5}),
		new Entity({x: 5, y: 6}),
		new Entity({x: 5, y: 7}),
	];

	return state;
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
 * Sets the current score for the game, saving the best ever back to local storage.
 */
const setScore = (state: SnakeGameState, value: number): void => {
	state.score = value;
};

/**
 * Mutates the game by executing one full turn and handles all state changes that result.
 * The game may be in a temporarily illegal state at any time during this function,
 * like snake segments on top of other segments,
 * but it is expected to be in a fully valid state before and after the function.
 * Any potentially illegal states need to be checked and reconciled before the function ends.
 */
export const updateGameState = (state: SnakeGameState, game: ISnakeGame): SnakeGameState => {
	// TODO  need to have input/output from one state to the next, still using mutating functions so we can user Immer or not

	// TODO performance.now()

	// Updates state like `game.snake.movementDirection` based on user input
	updateInput(game);

	// Update entities
	moveSnake(state, get(game.snakeMovementDirection)); // TODO avoid `get` -- probably with serialized inputs

	// Check for collision events and handle all possible game state changes.
	checkSnakeOutOfBounds(state, game);
	checkSnakeEatSelf(state, game);
	checkSnakeEatApple(state);

	checkWin(state, game);

	return state;
};

const checkWin = (state: SnakeGameState, game: ISnakeGame): void => {
	if (state.winningScore !== null && state.score >= state.winningScore) {
		game.emit({type: 'win_stage'});
	}
};

/**
 * Update the snake's movement direction with the next input direction, if any.
 */
function updateInput(game: ISnakeGame): void {
	// TODO this is always called first in update, so maybe it's a totally separate process, we only send serialized inputs here, then `.reset()` below gets converted
	game.movementCommandQueue.update(($v) => {
		if (!$v.length) return $v;
		$v = $v.slice(); // eslint-disable-line no-param-reassign
		game.snakeMovementDirection.set($v.shift()!);
		return $v;
	});
}

/**
 * Moves the snake in the given direction.
 */
function moveSnake({snakeSegments}: SnakeGameState, snakeMovementDirection: Direction): void {
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
function checkSnakeOutOfBounds(state: SnakeGameState, game: ISnakeGame): void {
	const {snakeSegments, mapWidth, mapHeight} = state;
	if (snakeSegments[0].isOutOfBounds(mapWidth, mapHeight)) {
		destroySnake(game);
	}
}

/**
 * As the quickest possible thing, just reset the game state when the player dies.
 */
function destroySnake(game: ISnakeGame): void {
	game.emit({type: 'fail_stage'});
}

/**
 * Checks if the snake eats itself. If so, destroy it.
 */
function checkSnakeEatSelf(state: SnakeGameState, game: ISnakeGame): void {
	const {snakeSegments} = state;
	const snakeHead = snakeSegments[0];
	for (const segment of snakeSegments) {
		if (segment !== snakeHead && segment.isCollidingWith(snakeHead)) {
			return destroySnake(game);
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
