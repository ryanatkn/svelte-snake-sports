<script lang="ts">
	import {swallow} from '@feltcoop/felt/util/dom.js';

	// TODO maybe use pointer events?
	// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

	export let setPointerDown: (down: boolean) => void;
	export let setPointerPosition: (x: number, y: number) => void;

	let el: HTMLElement;

	const updatePointer = (e: {clientX: number; clientY: number}) => {
		setPointerPosition(e.clientX - el.clientLeft, e.clientY - el.clientTop);
	};

	const onMousedown = (e: MouseEvent) => {
		if (e.button >= 3) return; // TODO how else to avoid breaking mouse back button on Chrome? doesn't happen on Firefox
		swallow(e);
		updatePointer(e);
		setPointerDown(true);
	};
	const onMouseup = (e: MouseEvent) => {
		if (e.button >= 3) return; // TODO how else to avoid breaking mouse back button on Chrome? doesn't happen on Firefox
		swallow(e);
		updatePointer(e);
		setPointerDown(false);
	};
	const onMousemove = (e: MouseEvent) => {
		swallow(e);
		updatePointer(e);
	};
	const onMouseenter = (e: MouseEvent) => {
		swallow(e);
		updatePointer(e);
	};
	const onMouseleave = (e: MouseEvent) => {
		swallow(e);
		updatePointer(e);
		setPointerDown(false);
	};

	let touch = false;

	// TODO can we mount only for mobile?
	// TODO handle all touches
	const onTouchstart = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		updatePointer(e.changedTouches[0]);
		setPointerDown(true);
	};
	const onTouchend = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		updatePointer(e.changedTouches[0]);
		setPointerDown(false);
	};
	const onTouchcancel = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		updatePointer(e.changedTouches[0]);
		setPointerDown(false);
	};
	const onTouchmove = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		updatePointer(e.changedTouches[0]);
	};

	const onContextmenu = (e: MouseEvent) => {
		if (touch && !e.shiftKey) {
			swallow(e);
		}
	};
</script>

<div
	bind:this={el}
	class="interactive-surface"
	on:mousedown={onMousedown}
	on:mouseup={onMouseup}
	on:mousemove={onMousemove}
	on:mouseenter={onMouseenter}
	on:mouseleave={onMouseleave}
	on:touchstart={onTouchstart}
	on:touchend={onTouchend}
	on:touchcancel={onTouchcancel}
	on:touchmove={onTouchmove}
	on:contextmenu={onContextmenu}
/>

<style>
	.interactive-surface {
		position: absolute;
		inset: 0;
		user-select: none;
	}
</style>
