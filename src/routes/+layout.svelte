<script lang="ts">
	import '@fuz.dev/fuz/style.css';
	import '@fuz.dev/fuz/theme.css';
	import '$lib/style.css';

	import Themed from '@fuz.dev/fuz/Themed.svelte';
	import {writable} from 'svelte/store';

	// TODO BLOCK doesn't seem to be working correctly, no `.dark` class added
	const selected_color_scheme = writable('dark' as const);
</script>

<svelte:head>
	<title>svelte🐍snake🐍sports</title>
</svelte:head>

<Themed {selected_color_scheme} color_scheme_fallback="dark">
	<slot />
</Themed>
