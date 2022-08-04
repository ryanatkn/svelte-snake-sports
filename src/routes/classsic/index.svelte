<script lang="ts">
	// import Breadcrumbs from '@feltcoop/felt/ui/Breadcrumbs.svelte';
	import {base} from '$app/paths';

	import ClasssicSnake from '$lib/sports/classsic/ClasssicSnake.svelte';
	import TitleImage from '$lib/TitleImage.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<TitleImage alt="logo for svelte snake sports: classsic" src="{base}/assets/classsic.webp" />

<ClasssicSnake />

<Footer />
