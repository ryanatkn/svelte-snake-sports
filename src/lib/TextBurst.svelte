<script lang="ts">
	import {random_int, random_item, random_float} from '@grogarden/util/random.js';
	import {GR_2i} from '@grogarden/util/maths.js';
	import {onMount} from 'svelte';

	export let count: number;
	export let items: string[];
	export let xRadius = 250;
	export let yRadius = 250;
	export let scaleMin = GR_2i;
	export let scaleMax = 1;
	export let hueRotationMin = 0;
	export let hueRotationMax = 0; // set to 360 to get a random range of colors
	export let startRotationMin = 0;
	export let startRotationMax = 360;
	export let endRotationMin = 0;
	export let endRotationMax = 360;

	const ANIMATION_TIMER = 2000;

	let done = false;

	let timeout: number;
	onMount(() => {
		timeout = setTimeout(() => (done = true), ANIMATION_TIMER);
		return () => clearTimeout(timeout);
	});
</script>

{#if !done}
	<div class="burst">
		{#each {length: count} as _}<div
				class="burst-item"
				style:--target_x="{random_int(-xRadius, xRadius)}px"
				style:--target_y="{random_int(-yRadius, yRadius)}px"
				style:--scale={random_float(scaleMin, scaleMax)}
				style:--start_rotation="{random_int(startRotationMin, startRotationMax)}deg"
				style:--end_rotation="{random_int(endRotationMin, endRotationMax)}deg"
				style:--hue_rotation="{random_int(hueRotationMin, hueRotationMax)}deg"
			>
				{random_item(items)}
			</div>{/each}
	</div>
{/if}

<style>
	.burst {
		position: relative;
	}
	.burst-item {
		position: absolute;
		left: 0;
		top: 0;
		filter: hue-rotate(var(--hue_rotation));
		transform: translate3d(0, 0, 0) scale3d(0, 0, 0);
		animation: burst 2s linear;
	}
	/* TODO can probably be improved to remove the `calc` values
	using the new standalone transform properties
	but I couldn't get it to work and it's late and I want to get this PR merged */
	@keyframes burst {
		0% {
			transform: translate3d(0, 0, 0) scale3d(0, 0, 0) rotate(var(--start_rotation));
		}
		7% {
			transform: translate3d(0, 0, 0) scale3d(var(--scale), var(--scale), var(--scale))
				rotate(calc(0.93 * var(--start_rotation) + 0.07 * var(--end_rotation)));
		}
		100% {
			transform: translate3d(var(--target_x), var(--target_y), 0) scale3d(0, 0, 0)
				rotate(var(--end_rotation));
		}
	}
</style>
