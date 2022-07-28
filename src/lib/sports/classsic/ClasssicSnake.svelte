<svelte:options immutable={false} />

<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/sports/simple/SimpleSnake.svelte` for the same thing but simplified.
	import {isEditable} from '@feltcoop/felt/util/dom.js';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import Renderer from '$lib/Renderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import {browser} from '$app/env';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	import {initGameState, updateGameState} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import ClockControls from '$lib/ClockControls.svelte';
	import DirectionalControls from '$lib/DirectionalControls.svelte';
	import MovementCommandQueue from '$lib/MovementCommandQueue.svelte';

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	let state = toDefaultGameState(); // TODO put this in a writable?
	initGameState(state);

	let tickDuration = Math.round(1000 / 6);

	let showSettings = false;

	const onKeydown = (e: KeyboardEvent) => {
		if (isEditable(e.target)) return;
		switch (e.key) {
			case '`': {
				clock.toggle();
				break;
			}
			case '1': {
				tick();
				break;
			}
		}
	};

	$: movementCommandQueue = game?.movementCommandQueue;
	$: currentCommand = $movementCommandQueue?.[0];

	const tick = () => {
		if (!game) return;
		// TODO BLOCK maybe serialize input state as param instead of `game`?
		state = updateGameState(state, game);
	};
</script>

<svelte:window on:keydown={onKeydown} />

<div class="ClasssicSnake">
	<SnakeGame bind:this={game} {state} {tick} />
	{#if game}
		<Renderer {state} {game} />
		<div class="controls padded-md">
			{#if movementCommandQueue}
				<div class="commands padded-md">
					<MovementCommandQueue {movementCommandQueue} />
				</div>
			{/if}
			<DirectionalControls
				selectedDirection={currentCommand}
				select={(d) => game?.enqueueMovementCommand(d)}
			/>
			<ClockControls {clock} />
			<button title="[1] next turn" class="icon-button" on:click={tick}>⏩</button>
		</div>
		<div class="scores-and-stats">
			<Score {state} />
			<Stats {game} />
		</div>
		<section class="centered">
			<Ticker {clock} {tickDuration} {tick} />
		</section>
		<section class="markup centered">
			<ul>
				<li>
					<strong>move</strong>: arrow keys, <code>wasd</code>, <code>hjkl</code>
					<ul>
						<li>
							optionally hold down <code>ctrl</code> or <code>shift</code> to move one turn at a time
						</li>
					</ul>
				</li>
				<li>
					<strong>toggle clock</strong>: <code>Backtick `</code>
				</li>
				<li>
					<strong>take one turn</strong>: <code>1</code>
				</li>
			</ul>
		</section>
		<section class="centered">
			<button on:click={() => (showSettings = !showSettings)}
				>{#if showSettings}stash settings{:else}show settings{/if}</button
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
	.controls {
		display: flex;
	}
	.scores-and-stats {
		display: flex;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
	.icon-button {
		font-size: var(--font_size_xl5);
	}
</style>
