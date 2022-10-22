import {browser} from '$app/environment';

// TODO BLOCK maybe use `locallyStored` or export a `createStorage` function,
// returning a store instance that gets saved automatically, abstracting away the key

export const clearLocalStorage = (key: string): void => {
	if (!browser) return;
	localStorage.removeItem(key);
	window.location = window.location; // TODO hacky until this is a store
};

export const askToClearLocalStorage = (key: string): void => {
	if (!browser) return;
	// eslint-disable-next-line no-alert
	if (confirm('permanently delete all saved data?')) {
		clearLocalStorage(key);
	}
};
