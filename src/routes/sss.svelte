<script lang="ts">
	import Ssses from '$lib/Ssses.svelte';
	import Header from '$lib/Header.svelte';

	let ssses: Array<{icon: string}> | undefined;
</script>

<main class="markup column">
	<section>
		<Header />
	</section>
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
