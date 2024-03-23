<script lang="ts">
	import {getClock} from '$lib/clock';

	export let fps = 0;

	// This might usually be implemented as a store, but it uses context,
	// so as a store it'd either need to have the `clock` as a dependency
	// or be restricted to only being created during component initialization,
	// which is a strange restriction to put on a store.
	// The syntax sugar is also pretty nice.
	// The main downside is that binding to the `fps` prop from the parent component
	// only initializes after mounting.

	const clock = getClock();
	$: $clock.running && update($clock.dt);

	let t = 0;
	let frames = 0;
	const update = (dt: number): void => {
		t += dt;
		frames++;
		if (t > 1000) {
			t -= 1000;
			fps = frames;
			frames = 0;
		}
	};
</script>
