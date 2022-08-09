import {browser} from '$app/env';

import {CLASSSIC_HIGH_SCORE_KEY} from '$lib/sports/classsic/ClasssicSnake.svelte';
import {SSSPEED_HIGH_SCORE_KEY} from '$lib/sports/ssspeed/SsspeedSnake.svelte';
import {BUNCHESES_HIGH_SCORE_KEY} from '$lib/sports/buncheses/BunchesesSnake.svelte';

export const clearLocalStorage = (): void => {
	if (!browser) return;
	localStorage.removeItem(CLASSSIC_HIGH_SCORE_KEY);
	localStorage.removeItem(SSSPEED_HIGH_SCORE_KEY);
	localStorage.removeItem(BUNCHESES_HIGH_SCORE_KEY);
	window.location = window.location;
};

export const askToClearLocalStorage = (): void => {
	if (!browser) return;
	// eslint-disable-next-line no-alert
	if (confirm('clear all saved data?')) {
		clearLocalStorage();
	}
};
