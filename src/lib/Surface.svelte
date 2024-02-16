<script lang="ts">
	import {swallow} from '@ryanatkn/belt/dom.js';

	// TODO probably add events
	export let scale = 1; // makes the pointer position calculations transform-scale-aware
	export let pointing: boolean | undefined = undefined;
	export let pointerDown: boolean | undefined = undefined;
	export let pointerX: number | undefined = undefined;
	export let pointerY: number | undefined = undefined;
	export let cancelOnLeave = true;

	const updatePointerPosition = (clientX: number, clientY: number): void => {
		const rect = el.getBoundingClientRect();
		pointerX = (clientX - rect.left) / scale;
		pointerY = (clientY - rect.top) / scale;
	};

	const onPointerdown = (e: PointerEvent & {currentTarget: EventTarget & HTMLDivElement}) => {
		if (e.shiftKey || e.button >= 3) return; // TODO how else to avoid breaking mouse back button on Chrome? doesn't happen on Firefox
		swallow(e);
		updatePointerPosition(e.clientX, e.clientY);
		pointerDown = true;
		focus();
	};
	const onPointerup = (e: PointerEvent & {currentTarget: EventTarget & HTMLDivElement}) => {
		if (e.shiftKey || e.button >= 3) return; // TODO how else to avoid breaking mouse back button on Chrome? doesn't happen on Firefox
		swallow(e);
		updatePointerPosition(e.clientX, e.clientY);
		pointerDown = false;
	};
	const onPointermove = (e: PointerEvent & {currentTarget: EventTarget & HTMLDivElement}) => {
		if (e.shiftKey) return;
		swallow(e);
		updatePointerPosition(e.clientX, e.clientY);
	};
	const onPointerenter = (e: PointerEvent & {currentTarget: EventTarget & HTMLDivElement}) => {
		if (e.shiftKey) return;
		swallow(e);
		updatePointerPosition(e.clientX, e.clientY);
		pointing = true;
	};
	const onPointerleave = (e: PointerEvent & {currentTarget: EventTarget & HTMLDivElement}) => {
		if (e.shiftKey) return;
		swallow(e);
		updatePointerPosition(e.clientX, e.clientY);
		pointing = false;
		if (cancelOnLeave && pointerDown) {
			pointerDown = false;
			unfocus();
		}
	};
	const onPointercancel = (e: PointerEvent & {currentTarget: EventTarget & HTMLDivElement}) => {
		if (e.shiftKey) return;
		swallow(e);
		if (pointerDown) {
			pointerDown = false;
			unfocus();
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
	class="surface"
	tabindex="0"
	role="button"
	bind:this={el}
	on:pointerdown={onPointerdown}
	on:pointerup={onPointerup}
	on:pointermove={onPointermove}
	on:pointerenter={onPointerenter}
	on:pointerleave={onPointerleave}
	on:pointercancel={onPointercancel}
>
	<slot />
</div>

<style>
	.surface {
		position: relative;
		width: var(--width, 100%);
		height: var(--height, 100%);
		-webkit-user-select: none;
		user-select: none;
		touch-action: none;
	}
</style>
