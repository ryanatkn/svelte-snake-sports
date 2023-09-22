<script lang="ts">
	import {is_editable, swallow} from '@grogarden/util/dom.js';

	// TODO maybe a hotkey definition API like {'ctrl+s,s,b': () => {...}}

	export let onKeydown: (
		key: string,
		ctrlKey: boolean,
		altKey: boolean,
		shiftKey: boolean,
	) => boolean;
	export let enabled = true;
</script>

<svelte:window
	on:keydown|capture={(e) => {
		if (enabled && !is_editable(e.target) && onKeydown(e.key, e.ctrlKey, e.altKey, e.shiftKey)) {
			swallow(e);
		}
	}}
/>
