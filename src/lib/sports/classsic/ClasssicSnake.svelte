<svelte:options immutable={false} />

<script lang="ts">
	// This version is a port of the original React project:
	// https://ryanatkn.github.io/snake-game
	// See `$lib/sports/simple/SimpleSnake.svelte` for the same thing but simplified.
	import {browser} from '$app/env';
	import {base} from '$app/paths';
	import {writable} from 'svelte/store';

	import SnakeGame from '$lib/SnakeGame.svelte';
	import DomRenderer from '$lib/renderers/dom/DomRenderer.svelte';
	import {createClock, setClock} from '$lib/clock';
	import Settings from '$lib/Settings.svelte';
	import Score from '$lib/Score.svelte';
	import Stats from '$lib/Stats.svelte';
	import {toDefaultGameState} from '$lib/SnakeGameState';
	import {initGameState, updateGameState} from '$lib/mutableSnakeGame';
	import Ticker from '$lib/Ticker.svelte';
	import StageControls from '$lib/StageControls.svelte';
	import ReadyInstructions from '$lib/sports/classsic/ReadyInstructions.svelte';
	import FailInstructions from '$lib/sports/classsic/FailInstructions.svelte';
	import TextBurst from '$lib/TextBurst.svelte';

	const clock = setClock(createClock({running: browser}));

	let game: SnakeGame | undefined;

	let showSettings = false;

	$: state = game?.state;
	$: events = game?.events;
	$: status = game?.status;

	// TODO better way to do this? event or callbacks?
	$: if ($status === 'ready') $status = 'playing';

	let applesEaten = 0;
	const highestApplesEaten = writable<number>(
		(browser && Number(localStorage.getItem('classsic_high_score'))) || 0,
	);

	// TODO maybe these shouldn't be stores?
	const tickDurationDecay = writable(0.97);
	const baseTickDuration = writable(Math.round(1000 / 6)); // the starting tick duration, may be modified by gameplay
	const currentTickDuration = writable($baseTickDuration);
	const tickDurationMin = writable(17);
	const tickDurationMax = writable(2000);

	// TODO is there a better place to do this? imperatively after updating the state?
	$: if (applesEaten > $highestApplesEaten) {
		$highestApplesEaten = applesEaten;
		if (browser) localStorage.setItem('classsic_high_score', applesEaten + ''); // TODO use helper on store instead
	}

	const tick = (): boolean => {
		if (!game || !$state || !$events || $status !== 'playing') {
			return false;
		}
		// TODO maybe serialize input state as param instead of `game`?
		$state = updateGameState($state, game);

		for (const event of $events) {
			switch (event.name) {
				case 'eat_apple': {
					applesEaten++;
					break;
				}
				case 'snake_collide_self':
				case 'snake_collide_bounds': {
					game.end('fail');
					if (applesEaten === 0) {
						game.reset();
						game.start();
					} else {
						// TODO show instructions
					}
					break;
				}
			}
		}
		// TODO immutable? move this elsewhere? like `afterTick`?
		// maybe this should be `onTick` and the SnakeGame's `tick` function does this work?
		if ($events.length) $events.length = 0;

		$currentTickDuration = Math.max(
			$tickDurationMin,
			Math.min(
				$tickDurationMax,
				Math.round($baseTickDuration! * $tickDurationDecay ** (1 + applesEaten)),
			),
		);

		return true;
	};
</script>

<div
	class="ClasssicSnake"
	class:game-fail={$status === 'fail'}
	class:game-ready={$status === 'ready'}
>
	<SnakeGame
		bind:this={game}
		toInitialState={() => initGameState(toDefaultGameState())}
		toInitialMovementDirection={() => 'up'}
		{tick}
		onReset={() => {
			applesEaten = 0;
			$currentTickDuration = $baseTickDuration;
		}}
	/>
	{#if game}
		<DomRenderer {game}>
			{#if applesEaten === 0}
				<ReadyInstructions {highestApplesEaten} />
			{:else if $status === 'fail'}
				<FailInstructions {applesEaten} {highestApplesEaten} />
				<div class="text-burst-wrapper">
					<TextBurst count={50} items={['🐍', '💥', '🦴', '🦴']} hueRotationMax={0} />
				</div>
			{/if}
		</DomRenderer>
		<div class="scores">
			<Score title="apples eaten this try">{applesEaten}</Score>
			{#if $highestApplesEaten !== applesEaten}
				<Score title="the most apples you've ever eaten">{$highestApplesEaten}</Score>
			{/if}
		</div>
		<Ticker {clock} tickDuration={currentTickDuration} {tick} />
		<StageControls {clock} {tick} {game} />
		<section class="markup column-sm">
			<div>
				<strong>to queue a move</strong>: arrow keys, <code>wasd</code>, <code>hjkl</code>
			</div>
			<div>
				<strong>to move and end turn</strong>: <code>ctrl</code> or <code>shift</code>
			</div>
			<div>
				<strong>toggle clock</strong>: <code>Backtick `</code>
			</div>
			<div>
				<strong>take one turn</strong>: <code>1</code>
				<strong>restart</strong>: <code>r</code>
			</div>
		</section>
		<section class="centered">
			<audio src="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls />
		</section>
		<section class="centered">
			<button on:click={() => (showSettings = !showSettings)}
				>{#if showSettings}stash settings{:else}show settings{/if}</button
			>
			{#if showSettings}
				<Stats {game} tickDuration={currentTickDuration} />
				<Settings
					{game}
					{baseTickDuration}
					{tickDurationMin}
					{tickDurationMax}
					{tickDurationDecay}
				/>
			{/if}
		</section>
	{/if}
</div>

<style>
	.ClasssicSnake {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	section {
		padding-top: var(--spacing_xl5);
	}
	.scores {
		display: flex;
	}
	.text-burst-wrapper {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
	}
</style>
