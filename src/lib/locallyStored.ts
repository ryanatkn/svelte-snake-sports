import {get, type Writable} from 'svelte/store';
import type {Json} from '@feltcoop/felt/util/json.js';

import {loadFromStorage, setInStorage} from '$lib/localStorage';

// TODO problem is this doesn't compose with custom stores that internally use `set` from a writable

// TODO ideally this type would work with `any` return values, not the default `void`,
// so custom stores can have whatever impl
type Stored<T> = T extends Writable<infer TValue> ? TValue : never;
type Mapped<T> = T extends Map<infer TKey, infer TValue> ? Array<[TKey, TValue]> : never;

/**
 * Mutates `store`, wrapping the common store change functions (set/update and mutate/swap)
 * with versions that write to `localStorage`,
 * and initializes the store value from storage if available.
 *
 * The change functions are overridden because we want to ensure
 * stores can be unsubscribed to go cold and get garbage collected.
 * There may be a way to get the best of both worlds and use `subscribe`.
 *
 * TODO try to improve the type so they need fewer or zero manual declarations
 * @param store
 * @param key localStorage key
 * @param toJson
 * @param fromJson
 * @returns
 */
export const locallyStored = <
	TJson extends Json,
	TStore extends Writable<TValue>,
	TValue = Stored<TStore>,
>(
	store: TStore,
	key: string,
	toJson?: (v: TValue) => TJson,
	fromJson?: (v: TJson) => TValue | undefined,
): TStore & {getJson: () => TJson} => {
	// Support stores that have at least one of the following methods:
	const {set, update} = store;

	let json = loadFromStorage(key) as TJson;
	if (json !== undefined) {
		const value = fromJson ? fromJson(json) : (json as any as TValue);
		if (value !== undefined) {
			if (set) set(value);
			else if (update) update(() => value);
			else throw Error('invalid store, expected either a set or update function');
		}
	}

	// TODO debounce by key to prevent setting more than once in the same frame
	const save = (value: any) => {
		// TODO should this check if the value changed?
		setInStorage(key, (json = toJson ? toJson(value) : value));
	};

	(store as TStore & {getJson: () => TJson}).getJson = (): TJson =>
		json === undefined ? (json = toJson ? toJson(get(store)) : (get(store) as any as TJson)) : json;

	if (set) {
		store.set = function () {
			const returned = (set as any).apply(this, arguments); // eslint-disable-line prefer-rest-params
			save(get(store));
			return returned;
		};
	}
	if (update) {
		store.update = function () {
			const returned = (update as any).apply(this, arguments); // eslint-disable-line prefer-rest-params
			save(get(store));
			return returned;
		};
	}
	return store as TStore & {getJson: () => TJson};
};

export const locallyStoredMap = <
	TStore extends Writable<TValue>,
	TValue extends Map<any, any> = Stored<TStore>,
	TJson extends Json = Mapped<TValue>,
>(
	store: TStore,
	key: string,
): TStore & {getJson: () => TJson} =>
	locallyStored(
		store,
		key,
		($v: any) => Array.from($v.entries()) as any,
		(json) => new Map(json) as any,
	);
