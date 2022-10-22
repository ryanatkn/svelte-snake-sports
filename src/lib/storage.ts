import {browser} from '$app/environment';

export const clearLocalStorage = (key: string): void => {
	if (!browser) return;
	localStorage.removeItem(key);
	window.location = window.location;
};

export const askToClearLocalStorage = (key: string): void => {
	if (!browser) return;
	// eslint-disable-next-line no-alert
	if (confirm('permanently delete all saved data?')) {
		clearLocalStorage(key);
	}
};
