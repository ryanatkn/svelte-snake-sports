<script lang="ts">
	import {base} from '$app/paths';

	import Header from '$lib/Header.svelte';
	import Sss from '$lib/Sss.svelte';
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
	<div class="markup">
		<section>
			<h2>sss</h2>
			<audio src="{base}/assets/Alexander_Nakarada__Lurking_Sloth.mp3" controls bind:this={song} />
		</section>
	</div>
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

	section {
		margin: var(--spacing_xl);
	}
</style>
