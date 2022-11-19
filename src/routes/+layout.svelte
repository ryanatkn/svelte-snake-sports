<script lang="ts">
	import '@feltcoop/felt/style.css';
	import {base} from '$app/paths';

	import '$lib/style.css';
</script>

<svelte:head>
	<title>svelte-snake-sports</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<slot />
