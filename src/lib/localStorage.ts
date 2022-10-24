import type {Json} from '@feltcoop/felt/util/json.js';

/**
 * Loads `key` and parses it as JSON.
 * If `validate` is provided and throws, it removes the `key` and returns `undefined`.
 * @param key
 * @param validate
 * @returns
 */
export const loadFromStorage = <T extends Json>(
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
		// some non-JSON value was stored, so clear it
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
export const setInStorage = (key: string, value: Json): void => {
	try {
		if (value === undefined) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (err) {} // ignore the error -- might be a sandboxed iframe like the Svelte REPL
};
