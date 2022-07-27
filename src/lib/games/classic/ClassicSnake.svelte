<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/games/simple/SimpleSnake.svelte` for the same thing but simplified.

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import {browser} from '$app/env';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	// import { createGameLoop } from '$lib/createGameLoop';
	import {initGameState, updateGameState, inputMovementCommand} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import ClockControls from '$lib/ClockControls.svelte';

	const clock = createClock({running: browser});
	setClock(clock);

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	let state = toDefaultGameState(); // TODO put this in a writable?

	let tickDuration = Math.round(1000 / 6);

	let showSettings = true;

	// // TODO or pass a block store?
	// const cancelGameLoop = createGameLoop((dt) => {
	// 	if (game) {
	// 		// Run all logic on the game for this time delta (dt).
	// 		// The update function is expected to be run at least every 30-60fps.
	// 		game.update(dt);
	// 	}

	// 	// Tell our renderer to update.
	// 	// This could be refactored depending on the render method,
	// 	// but in this case we're telling React to redraw at 60fps, which is not recommended!
	// 	// renderGame(game);
	// });

	// onDestroy(cancelGameLoop);

	const onKeydown = (e: KeyboardEvent) => {
		const {key} = e;
		if (key === '`') {
			clock.toggle();
		}
	};
</script>

<svelte:window on:keydown={onKeydown} />

<div class="ClasssicSnake">
	<SnakeGame bind:this={game} {state} {initGameState} {inputMovementCommand} />
	{#if game}
		<Renderer {state} />
		<div class="scores-and-stats">
			<Score {state} />
			<Stats {state} />
		</div>
		<section class="centered">
			<Ticker {clock} {tickDuration} tick={() => (state = updateGameState(state))} />
			<ClockControls {clock} />
		</section>
		<section class="centered">
			<button on:click={() => (showSettings = !showSettings)}
				>{#if showSettings}hide settings{:else}show settings{/if}</button
			>
			{#if showSettings}
				<Settings {state} bind:tickDuration />
			{/if}
		</section>
	{/if}
</div>

<style>
	.ClasssicSnake {
		display: flex;
		justify-content: center;
		padding-top: var(--spacing_xl3);
		flex-direction: column;
		align-items: center;
	}
	.scores-and-stats {
		display: flex;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
</style>
