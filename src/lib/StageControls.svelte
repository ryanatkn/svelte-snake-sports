<script lang="ts">
	import type {Clock} from '$lib/clock';
	import ClockControls from '$lib/ClockControls.svelte';
	import DirectionalControls from '$lib/DirectionalControls.svelte';
	import MovementCommandQueue from '$lib/MovementCommandQueue.svelte';
	import Hotkeys from '$lib/Hotkeys.svelte';
	import type SnakeGame from '$lib/SnakeGame.svelte';

	export let clock: Clock;
	export let tick: () => void;
	export let game: SnakeGame;

	$: ({movementCommandQueue, enqueueMovementCommand, status, setMovementCommand, start, reset} =
		game);
	$: currentCommand = $movementCommandQueue?.[0];
</script>

<div class="controls">
	<button title="[r] restart game" class="icon-button" on:click={reset}>⏮</button>
	<button title="[1] next turn" class="icon-button" on:click={tick}>⏩</button>
	<ClockControls {clock} />
	<DirectionalControls
		selectedDirection={currentCommand}
		select={(d) => enqueueMovementCommand(d)}
	/>
	{#if movementCommandQueue}
		<div class="padded-md">
			<MovementCommandQueue {movementCommandQueue} />
		</div>
	{/if}
</div>

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

<Hotkeys
	onKeydown={(key, shiftKey, ctrlKey) => {
		switch (key) {
			case 'ArrowUp':
			case 'w':
			case 'k': {
				if ($status !== 'initial') if (!start()) return false;
				if (ctrlKey || shiftKey) {
					setMovementCommand('up');
					tick();
				} else {
					enqueueMovementCommand('up');
				}
				return true;
			}
			case 'ArrowDown':
			case 's':
			case 'j': {
				if ($status !== 'initial') if (!start()) return false;
				if (ctrlKey || shiftKey) {
					setMovementCommand('down');
					tick();
				} else {
					enqueueMovementCommand('down');
				}
				return true;
			}
			case 'ArrowLeft':
			case 'a':
			case 'h': {
				if ($status !== 'initial') if (!start()) return false;
				if (ctrlKey || shiftKey) {
					setMovementCommand('left');
					tick();
				} else {
					enqueueMovementCommand('left');
				}
				return true;
			}
			case 'ArrowRight':
			case 'd':
			case 'l': {
				if ($status !== 'initial') if (!start()) return false;
				if (ctrlKey || shiftKey) {
					setMovementCommand('right');
					tick();
				} else {
					enqueueMovementCommand('right');
				}
				return true;
			}
		}
		return false;
	}}
/>

<style>
	.controls {
		display: flex;
		align-items: center;
		padding: var(--spacing_md);
	}
</style>
