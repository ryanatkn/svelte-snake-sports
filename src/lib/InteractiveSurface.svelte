<script lang="ts">
	import {swallow} from '@feltjs/util/dom.js';

	export let pointerDown: boolean; // readonly -- but maybe remove `setPointerDown` and bind to it externally?
	export let setPointerDown: (down: boolean) => void;
	export let setPointerPosition: (x: number, y: number) => void;

	const updatePointer = (offsetX: number, offsetY: number) => {
		setPointerPosition(offsetX, offsetY);
	};

	const onMousedown = (e: MouseEvent) => {
		if (e.button >= 3) return; // TODO how else to avoid breaking mouse back button on Chrome? doesn't happen on Firefox
		swallow(e);
		updatePointer(e.offsetX, e.offsetY);
		setPointerDown(true);
		focus();
	};
	const onMouseup = (e: MouseEvent) => {
		if (e.button >= 3) return; // TODO how else to avoid breaking mouse back button on Chrome? doesn't happen on Firefox
		swallow(e);
		updatePointer(e.offsetX, e.offsetY);
		setPointerDown(false);
	};
	const onMousemove = (e: MouseEvent) => {
		swallow(e);
		updatePointer(e.offsetX, e.offsetY);
	};
	const onMouseenter = (e: MouseEvent) => {
		swallow(e);
		updatePointer(e.offsetX, e.offsetY);
	};
	const onMouseleave = (e: MouseEvent) => {
		swallow(e);
		updatePointer(e.offsetX, e.offsetY);
		setPointerDown(false);
		if (pointerDown) unfocus(); // TODO equivalent for touch?
	};

	let touch = false;

	// TODO can we mount only for mobile?
	// TODO handle all touches
	const onTouchstart = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		updatePointer(e.changedTouches[0].pageX - rect.left, e.changedTouches[0].pageY - rect.top);
		setPointerDown(true);
		focus();
	};
	const onTouchend = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		updatePointer(e.changedTouches[0].pageX - rect.left, e.changedTouches[0].pageY - rect.top);
		setPointerDown(false);
	};
	const onTouchcancel = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		updatePointer(e.changedTouches[0].pageX - rect.left, e.changedTouches[0].pageY - rect.top);
		setPointerDown(false);
	};
	const onTouchmove = (e: TouchEvent) => {
		swallow(e);
		touch = true;
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		updatePointer(e.changedTouches[0].pageX - rect.left, e.changedTouches[0].pageY - rect.top);
	};

	const onContextmenu = (e: MouseEvent) => {
		if (touch && !e.shiftKey) {
			swallow(e);
		}
	};

	let el: HTMLDivElement;

	const focus = (): void => {
		if (document.activeElement !== el) {
			el.focus();
		}
	};
	const unfocus = (): void => {
		if (document.activeElement === el) {
			el.blur();
		}
	};
</script>

<div
	class="interactive-surface"
	tabindex="0"
	role="button"
	bind:this={el}
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
	.interactive-surface:focus {
		outline: var(--border_width_5) dotted var(--border_color_dark);
		border-radius: var(--border_radius_xs);
	}
</style>
