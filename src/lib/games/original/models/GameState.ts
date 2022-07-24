import {randomInt} from '@feltcoop/felt/util/random.js';
import {browser} from '$app/env';
import {ENTITY_DEFAULT_WIDTH, ENTITY_DEFAULT_HEIGHT, Entity, type Direction} from './Entity';

const MOVEMENT_COMMAND_QUEUE_SIZE = 4; // how many inputs a player can queue up at once

export interface SnakeState {
	movementDirection: Direction;
	segments: Entity[];
}

export interface InputState {
	movementCommands: Direction[];
}

interface Position {
	x: number;
	y: number;
}

/**
 * The GameState is a class because an entity-component-system
 * would be too much for the scope of this project.
 * A lot of the logic is split out into `src/actions`.
 * It's mostly data that should be easy to split into another form.
 */
export class GameState {
	mapWidth = 16; // tile count x
	mapHeight = 16; // tile count y
	tickDuration = 200; // ms per tick
	tickTimer = 0; // current tick timer
	score = 0; // how many apples have been eaten
	highScore = (browser && Number(localStorage.getItem('game.highScore'))) || 0;
	tiles: Entity[] = [];
	apples: Entity[] = [];
	snake: SnakeState = {
		movementDirection: 'up', // same type as items in `input.movementCommands`
		segments: [], // Entity[]
	};
	input: InputState = {
		movementCommands: [], // queue of inputs, ('up'|'down'|'left'|'right')[]
	};

	/**
	 * Finds the first entity at the given location. Ignores tile entities.
	 * This would be more generic if the game handled entities generically,
	 * but because of the small scope of this project I chose to a more explicit,
	 * less flexible data structure.
	 */
	findEntityAt(x: number, y: number): Entity | void {
		for (const a of this.apples) {
			if (a.isAt(x, y)) {
				return a;
			}
		}
		for (const s of this.snake.segments) {
			if (s.isAt(x, y)) {
				return s;
			}
		}
	}

	/**
	 * Returns {x, y} for a random empty tile on the game map.
	 */
	getRandomEmptyLocation(): Position {
		let position;
		while (!position || this.findEntityAt(position.x, position.y)) {
			position = this.getRandomLocation();
		}
		return position;
	}

	/**
	 * Gets a random position on the game map.
	 */
	getRandomLocation(): Position {
		return {
			x: randomInt(0, this.mapWidth - 1),
			y: randomInt(0, this.mapHeight - 1),
		};
	}

	/**
	 * Registers a movement input command to be processed by the game as a queue.
	 * Newer commands bump off older ones off the front.
	 */
	inputMovementCommand(movementCommand: Direction): void {
		this.input.movementCommands.push(movementCommand);
		while (this.input.movementCommands.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
			this.input.movementCommands.shift();
		}
	}

	/**
	 * Get the height of the map in pixels.
	 * TODO is a good candidate for MobX computed properties.
	 */
	get mapHeightPx(): number {
		return this.mapHeight * ENTITY_DEFAULT_HEIGHT;
	}

	/**
	 * Get the width of the map in pixels.
	 * TODO is a good candidate for MobX computed properties.
	 */
	get mapWidthPx(): number {
		return this.mapWidth * ENTITY_DEFAULT_WIDTH;
	}

	/**
	 * Sets the current score for the game, saving the best ever back to local storage.
	 */
	setScore(score: number): void {
		this.score = score;
		if (score > this.highScore) {
			this.highScore = score;
			if (browser) localStorage.setItem('game.highScore', this.highScore + ''); // TODO could be more automated, easy with mobx
		}
	}
}
