<script lang="ts">
	import {base} from '$app/paths';

	import SssmoothSnake from '$lib/sports/sssmooth/SssmoothSnake.svelte';
	import TitleImage from '$lib/TitleImage.svelte';
	import Footer from '$lib/Footer.svelte';

	console.log(`base`, base);
</script>

<TitleImage alt="logo for svelte snake sports: sssmooth" src="{base}/assets/sssmooth.webp" />

<SssmoothSnake />

<Footer />
