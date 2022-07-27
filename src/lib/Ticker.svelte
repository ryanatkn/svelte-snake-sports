<script lang="ts">
	import type {Clock} from '$lib/clock';

	export let clock: Clock;
	export let tick: ((dt: number) => void) | undefined = undefined;
	export let tickDuration: number;
	export let tickTimer = 0;
	export let updateTickDuration = (t: number): number => t * 0.9999;

	$: ({running} = $clock);
	$: running && update($clock.dt);

	// TODO BLOCK something like `let tickCount: number = 0; $: tickCount, tick()`;
	// so does that mean the game simulation shouldn't know about time at all? only ticks?
	// or rather, this should just have the `state: SnakeGameState` prop
	export const update = (dt: number): void => {
		tickTimer += dt;

		// TODO BLOCK move this outside of the component
		tickDuration = updateTickDuration(tickDuration);

		if (tickTimer >= tickDuration) {
			tick?.(tickTimer);
			tickTimer -= tickDuration;
		}
	};
</script>
