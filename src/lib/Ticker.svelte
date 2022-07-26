<script lang="ts">
	import type {Clock} from './clock';

	export let clock: Clock;
	export let tick: (dt: number) => void;
	export let tickTimer = 0;
	export let tickDuration = 0;
	export let updateTickDuration = (t: number): number => t * 0.9999;

	let dt: number;
	$: ({dt, running} = $clock);
	$: update(dt);

	// TODO BLOCK something like `let tickCount: number = 0; $: tickCount, tick()`;
	// so does that mean the game simulation shouldn't know about time at all? only ticks?
	// or rather, this should just have the `state: SnakeGameState` prop
	export const update = (dt: number): void => {
		tickTimer += dt;

		// TODO BLOCK move this outside of the component
		tickDuration = updateTickDuration(tickTimer);

		if (tickTimer >= tickDuration) {
			tick(dt);
			tickTimer = 0;
		}
	};
</script>

<button on:click={() => clock.toggle()}
	>{#if running}⏸{:else}▶{/if}</button
>
