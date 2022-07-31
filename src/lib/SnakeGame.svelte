<svelte:options immutable={false} />

<script lang="ts">
	import {browser} from '$app/env';
	import type {Direction} from '$lib/Entity';
	import {writable} from 'svelte/store';
	import type {SnakeGameState} from '$lib/SnakeGameState';
	import Hotkeys from '$lib/Hotkeys.svelte';
	import type {SnakeGameEvent} from '$lib/SnakeGame';

	export const TICK_DURATION_MIN = 17;
	export const TICK_DURATION_MAX = 2000;

	export let toInitialState: () => SnakeGameState;
	export let toInitialEvents: () => SnakeGameEvent[] = () => [];
	export let tick: () => void;

	export const state = writable(toInitialState());
	export const events = writable(toInitialEvents());
	export const baseTickDuration = writable(Math.round(1000 / 6)); // the starting tick duration, may be modified by gameplay
	export const currentTickDuration = writable($baseTickDuration);
	export const snakeMovementDirection = writable<Direction>('up');
	export const movementCommandQueue = writable<Direction[]>([]); // TODO should this be a generic command queue, not just movement?
	export const highScore = writable<number>(
		(browser && Number(localStorage.getItem('highScore'))) || 0,
	);
	export const runCount = writable(0);
	export const tickDurationDecay = writable(0.97);
	export const tickDurationMin = writable(TICK_DURATION_MIN);
	export const tickDurationMax = writable(TICK_DURATION_MAX);
	export const status = writable<'initial' | 'success' | 'failure'>('initial');

	export const reset = (): void => {
		$events = [];
		$currentTickDuration = $baseTickDuration;
		$snakeMovementDirection = 'up';
		$movementCommandQueue = [];
		$runCount++;
		$state = toInitialState();
	};

	export const emit = (event: SnakeGameEvent): void => {
		events.update(($v) => $v.concat(event));
	};

	export const end = (outcomeStatus: 'success' | 'failure'): void => {
		$status = outcomeStatus;
	};
	export const start = (): void => {
		if ($status === 'initial') return;
		$status = 'initial';
		reset();
	};

	$: ({score} = $state);

	$: console.log(`score`, score);

	// TODO seems a bit hacky to rely on score changes -- should probably recalculate this every tick
	$: $currentTickDuration = decayTickDuration($baseTickDuration, score);
	const decayTickDuration = (duration: number, score: number): number =>
		Math.max(
			$tickDurationMin,
			Math.min($tickDurationMax, Math.round(duration * $tickDurationDecay ** (1 + score))),
		);

	// TODO is there a better place to do this? imperatively after updating the state?
	$: if (score > $highScore) {
		console.log(`score`, score);
		$highScore = score;
		if (browser) localStorage.setItem('highScore', score + ''); // TODO use helper on store instead
	}

	const MOVEMENT_COMMAND_QUEUE_SIZE = 4; // how many inputs a player can queue up at once

	/**
	 * Registers a movement input command to be processed by the game as a queue.
	 * Newer commands bump off older ones off the front.
	 */
	export const enqueueMovementCommand = (movementCommand: Direction): void => {
		movementCommandQueue.update(($v) => {
			const $updated = [...$v, movementCommand];
			while ($updated.length > MOVEMENT_COMMAND_QUEUE_SIZE) {
				$updated.shift();
			}
			return $updated;
		});
	};

	export const setMovementCommand = (movementCommand: Direction): void => {
		$movementCommandQueue = [movementCommand];
	};
</script>

<Hotkeys
	onKeydown={(key, shiftKey, ctrlKey) => {
		switch (key) {
			case 'ArrowUp':
			case 'w':
			case 'k':
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event? should this be called on any key?
				// TODO BLOCK should it bail if the event doesn't change the status? `if ($status === 'initial') return;`
				if (ctrlKey || shiftKey) {
					setMovementCommand('up');
					tick();
				} else {
					enqueueMovementCommand('up');
				}
				return true;
			case 'ArrowDown':
			case 's':
			case 'j':
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event?
				if (ctrlKey || shiftKey) {
					setMovementCommand('down');
					tick();
				} else {
					enqueueMovementCommand('down');
				}
				return true;
			case 'ArrowLeft':
			case 'a':
			case 'h':
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event?
				if (ctrlKey || shiftKey) {
					setMovementCommand('left');
					tick();
				} else {
					enqueueMovementCommand('left');
				}
				return true;
			case 'ArrowRight':
			case 'd':
			case 'l':
				if ($status !== 'initial') start(); // TODO BLOCK maybe emit event?
				if (ctrlKey || shiftKey) {
					setMovementCommand('right');
					tick();
				} else {
					enqueueMovementCommand('right');
				}
				return true;
		}
		return false;
	}}
/>
