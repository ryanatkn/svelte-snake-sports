import {browser} from '$app/env';
import type {GameState} from '../models/GameState';

/**
 * Initializes input for the game, listening to DOM event listeners that update game state.
 */
export const initInput = (game: GameState): void => {
	if (browser) {
		document.body.addEventListener('keydown', (e) => {
			updateKeyDown(game, e.key);
		});
	}
};

export const updateKeyDown = (game: GameState, key: string): void => {
	switch (key) {
		case 'ArrowUp':
			game.inputMovementCommand('up');
			break;
		case 'ArrowDown':
			game.inputMovementCommand('down');
			break;
		case 'ArrowLeft':
			game.inputMovementCommand('left');
			break;
		case 'ArrowRight':
			game.inputMovementCommand('right');
			break;
		default:
			break;
	}
};
