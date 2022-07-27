<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Sss from '$lib/Sss.svelte';
	// import ClasssicSnake from '$lib/sports/classsic/ClasssicSnake.svelte';

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
		<menu>
			<li>
				<a href="/classsic" title="classssic snake sports"
					><span class="snake-1">🐍</span>classsic<span class="snake-2">🐍</span></a
				>
			</li>
			<!-- <li><a href="/invincible">invincible</a></li> -->
		</menu>
	</section>
	<div class="markup">
		<section>
			<h2>sss</h2>
			<audio src="/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls bind:this={song} />
		</section>
	</div>
	<!-- <ClasssicSnake /> -->
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
		text-align: center;
	}
	menu {
		font-size: var(--font_size_xl5);
	}
	menu a {
		font-weight: 300;
	}

	li {
		list-style: none;
	}
	a {
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
	.snake-1 {
		transform: rotate(4deg);
	}
	.snake-2 {
		transform: rotate(23deg);
	}
	section {
		margin: var(--spacing_xl);
	}
</style>
