<script lang="ts">
	import ClasssicSnake from '$lib/sports/classsic/ClasssicSnake.svelte';
	import {initGameState, spawnRandomShape6a} from '$lib/mutableSnakeGameState';
	import type SnakeGame from '$lib/SnakeGame.svelte';
	import {Entity} from '$lib/Entity';
	import {toDefaultGameState} from '$lib/SnakeGameState';

	// TODO name? Sshapes? Pianissst? Sssmoooth?

	/*

  This game is identical to Classsic except it always spawns apples in clustered groups.
  The idea is that it gets players consistent practice for a common and powerful Snake maneuver.

  */

	export let game: SnakeGame | undefined = undefined;

	const MAX_SPAWN_ATTEMPTS = 30;
</script>

<ClasssicSnake
	initialBaseTickDuration={1000 / 2}
	toInitialState={() => {
		const state = initGameState(toDefaultGameState());
		// spawn the apples
		state.apples.length = 0;
		state.apples = [
			new Entity(6, 2),
			new Entity(7, 2),
			new Entity(7, 3),
			new Entity(8, 3),
			new Entity(8, 2),
			new Entity(8, 1),
		];

		// slow down the speed
		// TODO BLOCK composition is really busted and weird, so `initialBaseTickDuration` above is just a hack
		// if (!baseTickDuration) throw Error('TODO');
		// $baseTickDuration = 1000 / 2;

		return state;
	}}
	helpers={{
		spawnApples: (state, game) => {
			// TODO BLOCK maybe `helpers` should be passed as a prop instead of being on the game?
			console.log(state, game);
			if (state.apples.length) return;
			let attempt = 0;
			while (attempt < MAX_SPAWN_ATTEMPTS) {
				attempt++;
				const spawned = spawnRandomShape6a(state);
				if (!spawned) continue;
				for (const position of spawned) {
					state.apples.push(new Entity(position.x, position.y));
				}
				return;
			}
			// Failed to place it, so end the game successfully --
			// this isn't good but it's the least worst easiest option I can think of right now.
			// A better design may be to query for possible locations
			// rather than blindly attempting to place shapes,
			// but that seems really hard, too hard for the stage this project is at.
			game.end('win');
		},
	}}
/>
