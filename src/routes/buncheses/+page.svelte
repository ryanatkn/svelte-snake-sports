<script lang="ts">
	import {base} from '$app/paths';

	import BunchesesSnake from '$lib/sports/buncheses/BunchesesSnake.svelte';
	import TitleImage from '$lib/TitleImage.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<TitleImage
	alt="logo for svelte🐍snake🐍sports: buncheses, macro photography of an adorable green cartoon snake with huge cute eyes next to a pile of red apples on lush green moss, realistic 3d video game, digital art, vibrant, artstation"
	src="{base}/assets/buncheses.webp"
/>

<BunchesesSnake />

<Footer />
