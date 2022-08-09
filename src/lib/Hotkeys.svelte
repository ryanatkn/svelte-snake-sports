<script lang="ts">
	import {isEditable, swallow} from '@feltcoop/felt/util/dom.js';

	// TODO maybe a hotkey definition API like {'ctrl+s,s,b': () => {...}}

	export let onKeydown: (
		key: string,
		shiftKey: boolean,
		ctrlKey: boolean,
		altKey: boolean,
	) => boolean;
	export let enabled = true;
</script>

<svelte:window
	on:keydown={(e) => {
		if (enabled && !isEditable(e.target) && onKeydown(e.key, e.shiftKey, e.ctrlKey, e.altKey)) {
			swallow(e);
		}
	}}
/>
