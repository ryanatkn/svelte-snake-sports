<script lang="ts">
	import {base} from '$app/paths';

	import Header from '$lib/Header.svelte';
	import Sss from '$lib/Sss.svelte';
	import SportsMenu from '$lib/SportsMenu.svelte';
	import Footer from '$lib/Footer.svelte';

	let ssses: Array<{icon: string}> | undefined;

	let clicks = 0;
	$: ssses, clicks++;
	$: if (clicks === 3) void song.play();

	let song: HTMLAudioElement;
</script>

<main class="column">
	<section>
		<Header />
	</section>
	<section>
		<SportsMenu />
	</section>
	<audio src="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3" bind:this={song} />
	<Footer />
	<Sss bind:ssses {song} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	section {
		margin: var(--spacing_1);
	}
</style>
