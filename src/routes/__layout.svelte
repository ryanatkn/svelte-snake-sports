<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import {base} from '$app/paths';
	import {browser} from '$app/env';
	import {writable} from 'svelte/store';

	import '$lib/style.css';
	import {setDimensions} from '$lib/dimensions';

	const dimensions = writable({
		width: browser ? window.innerWidth : 1,
		height: browser ? window.innerHeight : 1,
	});
	setDimensions(dimensions);
</script>

<svelte:head>
	<title>svelte-snake-sports</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<svelte:window
	on:resize={() => ($dimensions = {width: window.innerWidth, height: window.innerHeight})}
/>

<slot />
