<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import {base} from '$app/paths';
	import {writable} from 'svelte/store';

	import '$lib/style.css';
	import {setDimensions} from '$lib/dimensions';
	import Dimensions from '$lib/Dimensions.svelte';

	const dimensions = writable({width: 0, height: 0});
	setDimensions(dimensions);
</script>

<svelte:head>
	<title>svelte-snake-sports</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<Dimensions {dimensions} />

<slot />
