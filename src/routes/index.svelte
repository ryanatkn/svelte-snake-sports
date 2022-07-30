<script lang="ts">
	import {base} from '$app/paths';

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
				<a href="{base}/classsic" title="classssic snake sports">
					<img
						alt="logo for svelte snake sports: classsic"
						src="{base}/assets/classsic.webp"
						class="clickable-box"
					/>
				</a>
			</li>
		</menu>
	</section>
	<div class="markup">
		<section>
			<h2>sss</h2>
			<audio src="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls bind:this={song} />
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
		margin: 0 auto 1000px;
	}
	.markup {
		align-items: center;
		text-align: center;
	}
	menu {
		font-size: var(--font_size_xl5);
	}
	@media (max-width: 500px) {
		menu {
			font-size: var(--font_size_xl4);
		}
	}
	@media (max-width: 400px) {
		menu {
			font-size: var(--font_size_xl3);
		}
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
	section {
		margin: var(--spacing_xl);
	}
</style>
