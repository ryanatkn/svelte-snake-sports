<script lang="ts">
	import type {Dimensions} from '$lib/dimensions';
	import type {Writable} from 'svelte/store';

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
