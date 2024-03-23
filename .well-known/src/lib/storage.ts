// TODO maybe refactor to use a storage enhancer function

/**
 * Loads `key` and parses it as JSON.
 * If `validate` is provided and throws, it removes the `key` and returns `undefined`.
 * @param key
 * @param validate
 * @returns
 */
export const getFromStorage = <T>(
	key: string,
	validate?: (value: any) => asserts value is T,
): T | void => {
	let stored: string | null = null;
	try {
		stored = localStorage.getItem(key);
	} catch (err) {} // ignore the error -- might be a sandboxed iframe like the Svelte REPL
	if (!stored) {
		return;
	}
	try {
		const parsed = JSON.parse(stored);
		validate?.(parsed);
		return parsed;
	} catch (err) {
		// some non-JSON or invalid value was stored, so clear it
		try {
			localStorage.removeItem(key);
		} catch (err) {} // ignore the error -- might be a sandboxed iframe like the Svelte REPL
	}
};

/**
 * Sets a JSON `value` at `key`.
 * If `value` is `undefined` the `key` is removed,
 * but a `value` of `null` is stored.
 * @param key
 * @param value
 */
export const setInStorage = (key: string, value: any): void => {
	try {
		if (value === undefined) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (err) {} // ignore the error -- might be a sandboxed iframe like the Svelte REPL
};

export const clearLocalStorage = (key: string): void => {
	try {
		localStorage.removeItem(key);
		window.location = window.location; // TODO hacky until this is a store
	} catch (err) {
		// eslint-disable-next-line no-alert
		alert(
			'failed to clear localStorage item -- you might be in a sandboxed iframe like the Svelte REPL',
		);
	} // ignore the error -- might be a sandboxed iframe like the Svelte REPL
};

export const askToClearLocalStorage = (key: string): void => {
	// eslint-disable-next-line no-alert
	if (confirm('permanently delete saved data?')) {
		clearLocalStorage(key);
	}
};

export function assertNumber(value: unknown): asserts value is number {
	if (typeof value !== 'number' || Number.isNaN(value)) throw Error();
}
export function assertObject(value: any): asserts value is object {
	if (!value || typeof value !== 'object') throw Error();
}
