<script lang="ts" context="module">
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
</script>

<script lang="ts">
	export let dimensions: Writable<Dimensions>;

	// This measures an onscreen element instead of window.innerWidth/Height
	// to account for scrollbars on some OSes.
	let clientWidth = 0;
	let clientHeight = 0;

	$: if (clientWidth && clientHeight) {
		$dimensions = {width: clientWidth, height: clientHeight};
	}
</script>

<div bind:clientWidth bind:clientHeight />

<style>
	div {
		position: fixed;
		z-index: -99999;
		width: 100%;
		height: 100%;
	}
</style>
