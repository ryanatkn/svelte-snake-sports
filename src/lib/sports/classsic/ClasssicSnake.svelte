<svelte:options immutable={false} />

<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/sports/simple/SimpleSnake.svelte` for the same thing but simplified.

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
	import Hotkeys from '$lib/Hotkeys.svelte';

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;
	$: console.log(`game`, game);

	let showSettings = false;

	$: state = game?.state;
	$: movementCommandQueue = game?.movementCommandQueue;
	$: currentCommand = $movementCommandQueue?.[0];

	const tick = () => {
		if (!game || !$state) return;
		// TODO BLOCK maybe serialize input state as param instead of `game`?
		$state = updateGameState($state, game);
		// TODO BLOCK after updating game, if it's reset we need to increment runCount,
		// so we probably want an events/effects/output system
	};
</script>

<Hotkeys
	onKeydown={(key, _shiftKey, ctrlKey) => {
		switch (key) {
			case '`': {
				if (!ctrlKey) {
					clock.toggle();
					return true;
				} else {
					return false;
				}
			}
			case '1': {
				tick();
				return true;
			}
			case '2': {
				tick();
				tick();
				return true;
			}
			case '3': {
				for (let i = 0; i < 10; i++) tick();
				return true;
			}
		}
		return false;
	}}
/>

<div class="ClasssicSnake">
	<SnakeGame bind:this={game} initialState={initGameState(toDefaultGameState())} {tick} />
	{#if game}
		<Renderer {game} />
		<Ticker {clock} tickDuration={game.currentTickDuration} {tick} />
		<Score {game} />
		<div class="controls padded-md">
			<button title="[1] next turn" class="icon-button" on:click={tick}>⏩</button>
			<ClockControls {clock} />
			<DirectionalControls
				selectedDirection={currentCommand}
				select={(d) => game?.enqueueMovementCommand(d)}
			/>
			{#if movementCommandQueue}
				<div class="padded-md">
					<MovementCommandQueue {movementCommandQueue} />
				</div>
			{/if}
		</div>
		<div class="centered">
			<audio src="/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls />
			<Stats {game} />
		</div>
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
				<Settings {game} />
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
	section {
		padding-top: var(--spacing_xl5);
	}
	.icon-button {
		font-size: var(--font_size_xl5);
	}
</style>
