<script lang="ts">
	import {GR3i} from '@feltcoop/util/maths.js';

	import {getCurrentTickDuration} from '$lib/SnakeGame';

	export let x: number;
	export let y: number;
	export let width: number;
	export let height: number;
	// TODO is a hack just to get apples working, I haven't been using this pattern recently
	export let classes = 'plain';

	// the higher this constant, the looser the movement feels,
	// which can make it feel like difficult sludge.
	// however a higher constant, to a point, makes the animation smoother.
	const MOVEMENT_PCT_OF_TICK = GR3i;
	const DEFAULT_TICK_DURATION = 100;

	const currentTickDuration = getCurrentTickDuration();
	// this is why I use the `--snake_case` CSS var naming convention,
	// to have the same identifiers in JS match the CSS ones,
	// and it'll be a heck of a day with Svelte supports shorthand CSS custom properties :))
	$: transition_duration =
		$currentTickDuration === undefined
			? DEFAULT_TICK_DURATION
			: $currentTickDuration * MOVEMENT_PCT_OF_TICK;

	$: positionX = x * width;
	$: positionY = y * height;
</script>

<div
	class="Entity {classes}"
	style:transform="translate3d({positionX}px, {positionY}px, 0)"
	style:z-index={1000 + y}
	style:--transition_duration={transition_duration}
/>

<style>
	.Entity {
		display: block;
		position: absolute;
		/* TODO play with different easings  */
		transition: transform calc(var(--transition_duration) * 1ms) ease-in-out;
		width: var(--entity_width);
		height: var(--entity_height);
	}
	/* TODO hacky */
	.plain {
		border-radius: 15%;
	}
</style>
