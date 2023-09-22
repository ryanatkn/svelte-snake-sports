<script lang="ts">
	import '@fuz.dev/fuz/style.css';
	import '@fuz.dev/fuz/theme.css';
	import '$lib/style.css';

	import Themed from '@fuz.dev/fuz/Themed.svelte';
	import {sync_color_scheme} from '@fuz.dev/fuz/theme.js';
	import {writable} from 'svelte/store';

	const selected_color_scheme = writable('dark' as const);
	sync_color_scheme($selected_color_scheme);
</script>

<svelte:head>
	<title>svelte🐍snake🐍sports</title>
</svelte:head>

<Themed {selected_color_scheme} color_scheme_fallback={$selected_color_scheme}>
	<slot />
</Themed>
