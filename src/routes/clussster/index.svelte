<script lang="ts">
	import {base} from '$app/paths';

	import ClusssterSnake from '$lib/sports/clussster/ClusssterSnake.svelte';
	import TitleImage from '$lib/TitleImage.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<TitleImage alt="logo for svelte snake sports: clussster" src="{base}/assets/clussster.webp" />

<ClusssterSnake />

<Footer />
