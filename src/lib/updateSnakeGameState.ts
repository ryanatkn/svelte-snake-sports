import {randomInt, randomItem} from '@feltcoop/felt/util/random.js';
import {Logger} from '@feltcoop/felt/util/log.js';
import {EMPTY_OBJECT} from '@feltcoop/felt/util/object.js';

import {
	directions,
	Entity,
	horizontalDirections,
	verticalDirections,
	type Direction,
} from '$lib/Entity';
import type {SnakeGameState} from '$lib/SnakeGameState';
import {get} from 'svelte/store';
import type {ISnakeGame} from '$lib/SnakeGame';

const log = new Logger('[updateSnakeGameState]');

// TODO refactor this -- into what? a component?

interface Position {
	x: number;
	y: number;
}

/**
 * Updates the game by executing one full turn and handles all state changes that result.
 * The top-level state object always gets cloned,
 * and individual property values are cloned as necessary.
 * The game may be in a temporarily illegal state at any time during this function,
 * like snake segments on top of other segments,
 * but it is expected to be in a fully valid state before and after the function.
 * Any potentially illegal states need to be checked and reconciled before the function ends.
 */
export const updateSnakeGameState = (state: SnakeGameState, game: ISnakeGame): SnakeGameState => {
	// TODO  need to have input/output from one state to the next, still using mutating functions so we can user Immer or not

	validateState(state);

	// TODO performance.now()

	const nextState = game.beginUpdate(state);

	// Updates state like `game.snake.movementDirection` based on user input
	updateInput(game);

	// Update entities
	const movementDirection = get(game.movementDirection); // TODO avoid `get` -- probably with serialized inputs
	if (movementDirection) {
		moveSnake(nextState, game, movementDirection);
	}

	// Check for collision events and handle all possible game state changes.
	checkSnakeOutOfBounds(nextState, game);
	checkSnakeEatSelf(nextState, game);
	checkSnakeEatApple(nextState, game);

	// TODO `game.finishUpdate`?

	return nextState;
};

// quick n hacky, maybe use zod
export const validateState = (state: SnakeGameState): void => {
	if (!state.snakeSegments.length) throw Error(`state.snakeSegments cannot be empty`);
};

const DEFAULT_GAME_STATE: SnakeGameState = {
	mapWidth: 16,
	mapHeight: 16,
	apples: [new Entity(1, 3), new Entity(7, 2), new Entity(5, 9)],
	snakeSegments: [new Entity(4, 4), new Entity(4, 5), new Entity(5, 5), new Entity(5, 6)],
};

/**
 * Sets up the initial state for a game.
 */
export const initGameState = (
	state: SnakeGameState,
	defaultState: Partial<SnakeGameState> = EMPTY_OBJECT,
): SnakeGameState => {
	log.info('initGameState', state);
	// TODO  single state JSON object instead? update(state, controller) => nextState

	const inited = {...state};

	// preserve the existing mapWidth/mapHeight

	// Create the apples.
	inited.apples = syncEntityArray(state.apples, defaultState.apples || DEFAULT_GAME_STATE.apples);

	// Create the initial snake.
	inited.snakeSegments = syncEntityArray(
		state.snakeSegments,
		defaultState.snakeSegments || DEFAULT_GAME_STATE.snakeSegments,
	);

	return inited;
};

const syncEntityArray = (items: Entity[], defaults: Entity[]): Entity[] =>
	syncArray(
		items,
		defaults,
		(entity, defaultEntity) => entity.reset(defaultEntity),
		(e) => e.clone(),
	);

const syncArray = <T>(
	items: T[],
	defaults: T[],
	reset: (item: T, defaultItem: T) => void,
	clone: (defaultItem: T) => T,
): T[] => {
	// TODO BLOCK try to swap between 2 stable arrays?
	const synced = items.slice(); // TODO BLOCK don't preemptively clone
	while (synced.length > defaults.length) {
		synced.pop(); // TODO `destroy(synced.pop())`? if not, make this more efficient by slicing the length
	}
	for (let i = 0; i < defaults.length; i++) {
		const defaultItem = defaults[i];
		const existingItem: T | undefined = synced[i];
		if (existingItem) {
			reset(existingItem, defaultItem);
		} else {
			synced.push(clone(defaultItem));
		}
	}
	return synced;
};

/**
 * Finds the first entity at the given location.
 * Could be much more efficient if we cached things by position.
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

// TODO problem with this strategy is twofold:
// 1: it's inefficient to randomly look for an empty spot
// 2: it can fail when the map has few empty spots
// Maybe change to maintain a list of the available spots and choose randomly from that list.
/**
 * Returns {x, y} for a random empty tile on the game map.
 */
export const getRandomEmptyPosition = (
	state: SnakeGameState,
	maxAttempts = 50,
): Position | undefined => {
	let attempts = 0;
	while (attempts < maxAttempts) {
		attempts++;
		const position = getRandomPosition(state);
		if (!findEntityAt(state, position.x, position.y)) {
			return position;
		}
	}
	return;
};

/**
 * Returns a random direction, up/down/left/right.
 */
export const getRandomDirection = (): Direction => randomItem(directions);

export const getRandomTangent = (from: Direction): Direction =>
	randomItem(from === 'up' || from === 'down' ? horizontalDirections : verticalDirections);

export const toOppositeDirection = (from: Direction): Direction =>
	from === 'up' ? 'down' : from === 'down' ? 'up' : from === 'left' ? 'right' : 'left';

/**
 * Given a direction, makes a random turn.
 * So if you're heading up or down, it'll choose left or right,
 * and if you're going left or right, it'll choose up or down.
 */
export const getRandomTurn = (current: Direction): Direction =>
	randomItem(isVerticalDirection(current) ? horizontalDirections : verticalDirections);

export const isVerticalDirection = (direction: Direction): boolean =>
	direction === 'left' || direction === 'right';

export const isHorizontalDirection = (direction: Direction): boolean =>
	direction === 'up' || direction === 'down';

// This mutates `state.apples` if it can place the desired shape,
// but this is a hacky strategy and probably over-optimized.
// Also, the strategy this uses is to pick a random spot and try to place the shape,
// which is hacky and will fail a lot when many tiles are filled.
// A possible improvement would be to track empty tiles and allow querying for shapes.
export const spawnRandomShape6a = (
	state: SnakeGameState,
	position1 = getRandomEmptyPosition(state),
): Position[] | undefined => {
	if (!position1) return;

	// Then choose a random direction.
	const direction1 = getRandomDirection();
	const position2 = getPositionFrom(state, position1, direction1);
	if (!position2) return;

	// Then choose a direction tangential to `direction1`.
	const direction2 = getRandomTangent(direction1);
	const position3 = getPositionFrom(state, position2, direction2);
	if (!position3) return;

	// Then move the same as `direction1`.
	const direction3 = direction1;
	const position4 = getPositionFrom(state, position3, direction3);
	if (!position4) return;

	// Then move the opposite of `direction2`.
	const direction4 = toOppositeDirection(direction2);
	const position5 = getPositionFrom(state, position4, direction4);
	if (!position5) return;

	// Then move the same as `direction1` one last time.
	const position6 = getPositionFrom(state, position5, direction4);
	if (!position6) return;

	return [position1, position2, position3, position4, position5, position6];
};

export const getPositionFrom = (
	state: SnakeGameState,
	position: Position,
	direction: Direction,
): Position | undefined => {
	const x = moveX(position.x, direction);
	const y = moveY(position.y, direction);

	// Ensure x and y are in bounds.
	if (x < 0 || x >= state.mapWidth || y < 0 || y >= state.mapHeight) return;

	// Ensure x and y are empty.
	const existingEntity = findEntityAt(state, x, y);
	if (existingEntity) return;

	return {x, y};
};

export const moveX = (x: number, direction: Direction): number =>
	direction === 'left' ? x - 1 : direction === 'right' ? x + 1 : x;

export const moveY = (y: number, direction: Direction): number =>
	direction === 'up' ? y - 1 : direction === 'down' ? y + 1 : y;

/**
 * Gets a random position on the game map.
 */
const getRandomPosition = ({mapWidth, mapHeight}: SnakeGameState): Position => ({
	x: randomInt(0, mapWidth - 1),
	y: randomInt(0, mapHeight - 1),
});

/**
 * Update the snake's movement direction with the next input direction, if any.
 */
const updateInput = (game: ISnakeGame): void => {
	// TODO this is always called first in update, so maybe it's a totally separate process, we only send serialized inputs here, then `.reset()` below gets converted
	game.movementCommandQueue.update(($v) => {
		if (!$v.length) return $v;
		const $next = $v.slice();
		game.movementDirection.set($next.shift()!);
		return $next;
	});
};

/**
 * Moves the snake in the given direction.
 */
const moveSnake = (state: SnakeGameState, game: ISnakeGame, movementDirection: Direction): void => {
	const snakeSegments = toSnakeSegments(state, game);

	// Move the head first, because our algorithm reads the previous positions
	// of the preceding segments to move them to, so this works.
	snakeSegments[0] = toSnakeSegment(state, game, 0).moveDir(movementDirection);

	// Make the body follow the head
	for (let i = 1; i < snakeSegments.length; i++) {
		const {prevX, prevY} = snakeSegments[i - 1];
		snakeSegments[i] = toSnakeSegment(state, game, i).moveTo(prevX, prevY);
	}
};

/**
 * We only need to check the head of the snake to see if the whole thing is in bounds
 * because of the game's movement rules.
 */
const checkSnakeOutOfBounds = (state: SnakeGameState, game: ISnakeGame): void => {
	const {snakeSegments, mapWidth, mapHeight} = state;
	if (snakeSegments[0].isOutOfBounds(mapWidth, mapHeight)) {
		game.emit({name: 'snake_collide_bounds'});
	}
};

/**
 * Checks if the snake eats itself. If so, destroy it.
 */
const checkSnakeEatSelf = (state: SnakeGameState, game: ISnakeGame): void => {
	const {snakeSegments} = state;
	const snakeHead = snakeSegments[0];
	for (let i = 1; i < snakeSegments.length; i++) {
		const segment = snakeSegments[i];
		if (segment.isCollidingWith(snakeHead)) {
			game.emit({name: 'snake_collide_self', segment});
		}
	}
};

/**
 * Check if the snake eats an apple. If so, update the game state to handle it.
 */
const checkSnakeEatApple = (state: SnakeGameState, game: ISnakeGame): void => {
	const {snakeSegments, apples} = state;
	const snakeHead = snakeSegments[0];
	for (const apple of apples) {
		if (snakeHead.isCollidingWith(apple)) {
			return eatApple(state, game, apple);
		}
	}
};

/**
 * Has the snake eat an apple, removing the apple and growing the snake.
 */
const eatApple = (state: SnakeGameState, game: ISnakeGame, apple: Entity): void => {
	const apples = toApples(state, game);
	const snakeSegments = toSnakeSegments(state, game);

	game.emit({name: 'eat_apple', apple});

	// Remove the apple.
	apples.splice(apples.indexOf(apple), 1);

	// Create a new end tail segment that looks like the current end of the snake.
	const prevEndSegment = snakeSegments.at(-1)!;
	const nextEndSegment = prevEndSegment.clone();

	// Position the new end tail segment at the previous position of the current end of the snake.
	nextEndSegment.moveTo(prevEndSegment.prevX, prevEndSegment.prevY);
	snakeSegments.push(nextEndSegment);

	game.helpers.spawnApples(state, game);
};

/**
 * Creates an apple on a random empty square.
 */
export const spawnApples = (state: SnakeGameState, game: ISnakeGame): void => {
	const position = getRandomEmptyPosition(state);
	if (!position) return;
	const apple = new Entity(position.x, position.y);
	toApples(state, game).push(apple);
};

// TODO make a single generic function for this? `lazyClone`? need a shallow clone fn
export const toApples = (state: SnakeGameState, game: ISnakeGame): Entity[] =>
	state.apples === game.prevState?.apples ? (state.apples = state.apples.slice()) : state.apples;
export const toSnakeSegments = (state: SnakeGameState, game: ISnakeGame): Entity[] =>
	state.snakeSegments === game.prevState?.snakeSegments
		? (state.snakeSegments = state.snakeSegments.slice())
		: state.snakeSegments;
export const toSnakeSegment = (state: SnakeGameState, game: ISnakeGame, index: number): Entity =>
	state.snakeSegments[index] === game.prevState?.snakeSegments[index]
		? (state.snakeSegments[index] = state.snakeSegments[index].clone(true))
		: state.snakeSegments[index];
