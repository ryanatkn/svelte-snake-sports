<script lang="ts">
	import ClasssicSnake from '$lib/sports/classsic/ClasssicSnake.svelte';
	import {spawnRandomShape6a} from '$lib/mutableSnakeGameState';
	import type SnakeGame from '$lib/SnakeGame.svelte';
	import {Entity} from '$lib/Entity';

	// TODO name? Sshapes? Pianissst? Sssmoooth?

	/*

  This game is identical to Classsic except it always spawns apples in clustered groups.
  The idea is that it gets players consistent practice for a common and powerful Snake maneuver.

  */

	export let game: SnakeGame | undefined = undefined;

	const MAX_SPAWN_ATTEMPTS = 30;
</script>

<ClasssicSnake
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
