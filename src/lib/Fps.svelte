<script lang="ts">
	import {getClock} from '$lib/clock';

	export let fps: number;

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
