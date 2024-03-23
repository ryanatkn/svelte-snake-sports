<script lang="ts">
	import type {Clock} from '$lib/clock';
	import type {Writable} from 'svelte/store';

	export let clock: Clock;
	export let tick: (() => void) | undefined = undefined;
	export let tickDuration: Writable<number>;
	export let tickTimer = 0;

	$: ({running} = $clock);
	$: running && update($clock.dt);

	export const update = (dt: number): void => {
		tickTimer += dt;

		if (tickTimer >= $tickDuration) {
			tick?.();
			tickTimer = 0;
		}
	};
</script>
