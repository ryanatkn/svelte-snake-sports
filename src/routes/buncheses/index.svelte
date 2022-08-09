<script lang="ts">
	import {base} from '$app/paths';

	import BunchesesSnake from '$lib/sports/buncheses/BunchesesSnake.svelte';
	import TitleImage from '$lib/TitleImage.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<TitleImage alt="logo for svelte snake sports: buncheses" src="{base}/assets/buncheses.webp" />

<BunchesesSnake />

<Footer />
