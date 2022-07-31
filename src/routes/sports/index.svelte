<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Sports from '$lib/Sports.svelte';

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
		<Sports />
	</section>
	<footer><a href="/">go back home</a></footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	section {
		margin: var(--spacing_xl);
	}
</style>
