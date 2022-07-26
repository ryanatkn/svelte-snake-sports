<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Sss from '$lib/Sss.svelte';
	// import OriginalSnake from '$lib/games/original/OriginalSnake.svelte';

	let ssses: Array<{icon: string}> | undefined;

	let clicks = 0;
	$: ssses, clicks++;
	$: if (clicks === 3) void song.play();

	let song: HTMLAudioElement;
</script>

<main class="column">
	<div class="markup">
		<section>
			<Header />
		</section>
		<section>
			<menu>
				<li><a href="/original">original</a></li>
				<li><a href="/invincible">invincible</a></li>
			</menu>
		</section>
		<section>
			<audio src="/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls bind:this={song} />
		</section>
	</div>
	<!-- <OriginalSnake /> -->
	<Sss bind:ssses {song} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
	.markup {
		align-items: center;
	}
	menu {
		font-size: var(--font_size_xl);
	}
</style>
