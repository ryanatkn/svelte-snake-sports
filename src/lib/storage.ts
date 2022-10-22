import {browser} from '$app/environment';

const storageKeys = new Set<string>();

export const registerStorageKey = <T extends string>(key: T): T => {
	storageKeys.add(key);
	return key;
};

export const clearLocalStorage = (): void => {
	if (!browser) return;
	for (const key of storageKeys) {
		localStorage.removeItem(key);
	}
	window.location = window.location;
};

export const askToClearLocalStorage = (): void => {
	if (!browser) return;
	// eslint-disable-next-line no-alert
	if (confirm('permanently delete all saved data?')) {
		clearLocalStorage();
	}
};
