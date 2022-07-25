<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Ssses from '$lib/Ssses.svelte';
	// import OriginalSnake from '$lib/games/original/OriginalSnake.svelte';

	let ssses: Array<{icon: string}> | undefined;

	let clicks = 0;
	$: ssses, clicks++;
	$: if (clicks === 3) void song.play();

	let song: HTMLAudioElement;
</script>

<main class="markup column">
	<section>
		<Header />
	</section>
	<menu>
		<li><a href="/original">original</a></li>
		<li><a href="/sss">sss</a></li>
	</menu>
	<section>
		<audio src="/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls bind:this={song} />
	</section>
	<!-- <OriginalSnake /> -->
	<Ssses bind:ssses />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
</style>
