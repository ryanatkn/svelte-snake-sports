<script lang="ts">
	// TODO BLOCK how should this work?
	// maybe use pointer events?
	// maybe fire events instead?
	// disable it when the game is paused, so UI can be clicked? or should that UI be rendered over the top?
	// yeah that makes more sense -- the InteractiveSurface should be *below* the instructions.

	export let setPointerDown: (down: boolean) => void;
	export let setPointerPosition: (x: number, y: number) => void;

	let el: HTMLElement;

	const updatePointer = (e: {clientX: number; clientY: number}) => {
		setPointerPosition(e.clientX - el.clientLeft, e.clientY - el.clientTop);
	};

	const onMousedown = (e: MouseEvent) => {
		updatePointer(e);
		setPointerDown(true);
	};
	const onMouseup = (e: MouseEvent) => {
		updatePointer(e);
		setPointerDown(false);
	};
	const onMousemove = (e: MouseEvent) => {
		updatePointer(e);
	};
	const onMouseenter = (e: MouseEvent) => {
		updatePointer(e);
	};
	const onMouseleave = (e: MouseEvent) => {
		updatePointer(e);
		setPointerDown(false);
	};

	// TODO can we mount only for mobile?
	// TODO handle all touches
	const onTouchstart = (e: TouchEvent) => {
		updatePointer(e.changedTouches[0]);
		setPointerDown(true);
	};
	const onTouchend = (e: TouchEvent) => {
		updatePointer(e.changedTouches[0]);
		setPointerDown(false);
	};
	const onTouchcancel = (e: TouchEvent) => {
		updatePointer(e.changedTouches[0]);
		setPointerDown(false);
	};
	const onTouchmove = (e: TouchEvent) => {
		updatePointer(e.changedTouches[0]);
	};
</script>

<!-- TODO instead of trapping the click with `stopPropagation`,
allow it to bubble and do whatever
-->
<div
	bind:this={el}
	class="interactive-surface"
	on:mousedown|stopPropagation={onMousedown}
	on:mouseup|stopPropagation={onMouseup}
	on:mousemove|stopPropagation={onMousemove}
	on:mouseenter={onMouseenter}
	on:mouseleave={onMouseleave}
	on:touchstart={onTouchstart}
	on:touchend={onTouchend}
	on:touchcancel={onTouchcancel}
	on:touchmove={onTouchmove}
/>

<style>
	.interactive-surface {
		position: absolute;
		inset: 0;
		user-select: none;
	}
</style>
