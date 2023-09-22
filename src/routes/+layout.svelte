<script lang="ts">
	import '@fuz.dev/fuz/style.css';
	import '@fuz.dev/fuz/theme.css';
	import '$lib/style.css';

	import Themed from '@fuz.dev/fuz/Themed.svelte';
</script>

<svelte:head>
	<title>svelte🐍snake🐍sports</title>
</svelte:head>

<Themed color_scheme_fallback="dark">
	<slot />
</Themed>
