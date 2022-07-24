import {browser} from '$app/env';

/**
 * Goes into an infinite update/render loop. Returns a function to cancel it.
 * A more advanced version could take 2 params, update and render, to better suit certain use cases.
 */
export const createGameLoop = (update: (time: number) => void): (() => void) => {
	let lastTime = 0;
	let running = true;

	const onFrame = (time: number) => {
		if (!running) return;
		if (lastTime !== 0) {
			update(time - lastTime);
		}
		lastTime = time;
		requestAnimationFrame(onFrame);
	};
	if (browser) requestAnimationFrame(onFrame);

	return () => {
		running = false;
	};
};
