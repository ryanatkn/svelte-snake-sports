<script lang="ts">
	import {base} from '$app/paths';

	import SsspeedSnake from '$lib/sports/ssspeed/SsspeedSnake.svelte';
	import TitleImage from '$lib/TitleImage.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>svelte🐍snake🐍sports: ssspeed</title>
</svelte:head>

<TitleImage
	alt="logo for svelte🐍snake🐍sports: ssspeed, macro photography of a cute cartoon snake eating a red apple on lush green moss in a 3d video game"
	src="{base}/assets/ssspeed.webp"
/>

<SsspeedSnake />

<Footer />
