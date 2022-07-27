<script lang="ts">
	import type {Clock} from '$lib/clock';

	export let clock: Clock;
	export let tick: (() => void) | undefined = undefined;
	export let tickDuration: number;
	export let tickTimer = 0;
	export let updateTickDuration = (t: number): number => t * 0.9999;

	$: ({running} = $clock);
	$: running && update($clock.dt);

	export const update = (dt: number): void => {
		tickTimer += dt;

		// TODO  move this outside of the component
		tickDuration = updateTickDuration(tickDuration);

		if (tickTimer >= tickDuration) {
			tick?.();
			tickTimer -= tickDuration;
		}
	};
</script>
