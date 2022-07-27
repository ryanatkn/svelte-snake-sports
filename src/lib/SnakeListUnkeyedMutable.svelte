<svelte:options immutable={false} />

<script lang="ts">
	import Positioned from '$lib/Positioned.svelte';
	import {scale as scaleTransition} from 'svelte/transition';
	import type {LayoutItem} from '$lib/layoutItem';

	export let layoutItems: LayoutItem[];
</script>

{#each layoutItems as item, i}
	<Positioned
		x={item.x}
		y={item.y}
		scale={item.scale + Math.cos(i) / 3.5}
		rotate="{Math.cos(i) * -23}deg"
		><div
			in:scaleTransition={{duration: 1000}}
			style:font-size="{item.fontSize}px"
			style:filter="hue-rotate({i * 23}deg)"
		>
			{item.sss.icon}
		</div>
	</Positioned>
{/each}
