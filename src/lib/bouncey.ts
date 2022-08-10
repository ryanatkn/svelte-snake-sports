import {tick} from 'svelte';
import {writable, type Readable, get} from 'svelte/store';

export interface Bouncey {
	subscribe: Readable<boolean>['subscribe'];
	updateKey: (key: any) => void;
}

// TODO this is more generic than being a bounce animation,
// it debounces toggling to the `true` state through a frame of `false`,
// useful for restarting CSS animations -- what's a good name for it?

export const bouncey = (): Bouncey => {
	const bounce = writable(false);
	let lastKey: any;

	return {
		subscribe: bounce.subscribe,
		updateKey: async (key: any): Promise<void> => {
			if (key === lastKey) return;
			if (key === undefined) {
				lastKey = key;
				return;
			}
			lastKey = key;
			// TODO ideally don't use `get`
			if (get(bounce)) {
				bounce.set(false);
				await tick();
			}
			bounce.set(true);
		},
	};
};
