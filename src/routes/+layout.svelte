<script lang="ts">
	import '@ryanatkn/fuz/style.css';
	import '@ryanatkn/fuz/theme.css';
	import '$lib/style.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import {sync_color_scheme} from '@ryanatkn/fuz/theme.js';
	import {writable} from 'svelte/store';

	const selected_color_scheme = writable('dark' as const);
	sync_color_scheme($selected_color_scheme); // TODO probably shouldn't be needed
</script>

<svelte:head>
	<title>svelte🐍snake🐍sports</title>
</svelte:head>

<Themed {selected_color_scheme} color_scheme_fallback={$selected_color_scheme}>
	<slot />
</Themed>
