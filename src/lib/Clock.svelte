<script lang="ts">
	import {browser} from '$app/env';
	import {writable} from 'svelte/store';

	export const time = writable(0);
	export const lastTime = writable(0);
	export const dt = writable(0);
	export const running = writable(false);

	// TODO
	// fps
	// dropped frames

	const onFrame = (t: number) => {
		if (!$running) return;
		if ($lastTime !== 0) {
			$dt = $time - $lastTime;
		}
		$lastTime = t;
		requestAnimationFrame(onFrame);
	};

	export const pause = (): void => {
		if (!$running) return;
		$running = false;
	};
	export const play = (): void => {
		if ($running) return;
		$running = true;
		if (browser) requestAnimationFrame(onFrame);
	};
	export const toggle = (): void => ($running ? pause() : play());
</script>
