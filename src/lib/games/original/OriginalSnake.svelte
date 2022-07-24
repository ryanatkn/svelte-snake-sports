<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/games/simple/SimpleSnake.svelte` for the same thing but simplified.

	import Renderer from './components/Renderer.svelte';
	import {GameState} from './models/GameState';
	import {initGameState} from './actions/initGameState';
	import {createGameLoop} from './utils/createGameLoop';
	import {updateGame} from './actions/updateGame';
	import {initInput} from './actions/initInput';

	const game = ((globalThis as any).game = new GameState()); // create the game state object, analogous to a Flux store or Redux root state
	initGameState(game); // set up the initial game state
	initInput(game);

	(globalThis as any).cancelGameLoop = createGameLoop((dt) => {
		// Run all logic on the game for this time delta (dt).
		// The update function is expected to be run at least every 30-60fps.
		updateGame(game, dt);

		// Tell our renderer to update.
		// This could be refactored depending on the render method,
		// but in this case we're telling React to redraw at 60fps, which is not recommended!
		// renderGame(game);
	});

	console.log('Game started! Use `globalThis.cancelGameLoop()` to stop it.');
</script>

<div class="OriginalSnake">
	<Renderer {game} />
</div>

<style>
	.OriginalSnake {
		display: flex;
		justify-content: center;
		padding-top: 64px;
	}
</style>
