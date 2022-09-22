import {browser} from '$app/environment';

export const CLASSSIC_HIGH_SCORE_KEY = 'classsic_high_score';
export const SSSPEED_HIGH_SCORE_KEY = 'ssspeed_high_score';
export const BUNCHESES_HIGH_SCORE_KEY = 'buncheses_high_score';

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
	if (confirm('permanently delete all saved data?')) {
		clearLocalStorage();
	}
};
