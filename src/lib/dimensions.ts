import {getContext, setContext} from 'svelte';
import type {Writable} from 'svelte/store';

export interface Dimensions {
	width: number;
	height: number;
}

const KEY = Symbol();

export const getDimensions = (): Writable<Dimensions> => getContext(KEY);

export const setDimensions = (dimensions: Writable<Dimensions>): Writable<Dimensions> =>
	setContext(KEY, dimensions);
