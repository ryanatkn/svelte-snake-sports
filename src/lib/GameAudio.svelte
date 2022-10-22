<script lang="ts">
	import Hotkeys from '$lib/Hotkeys.svelte';

	export let song: string;
	export let el: HTMLAudioElement | undefined = undefined; // for external binding
	export let playing = false; // for external binding

	export const play = (): void => {
		if (playing) return;
		playing = true;
		void el?.play();
	};

	export const pause = (): void => {
		if (!playing) return;
		el?.pause();
		playing = false;
	};

	export const toggle = (): void => (playing ? pause() : play());
</script>

<audio src={song} controls bind:this={el} />

<Hotkeys
	onKeydown={(key, ctrlKey, altKey) => {
		if (ctrlKey || altKey) return false;
		switch (key) {
			case '=': {
				toggle();
				return true;
			}
		}
		return false;
	}}
/>
