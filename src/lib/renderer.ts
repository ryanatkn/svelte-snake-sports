import type {SvelteComponent} from 'svelte';

export interface Renderer {
	name: string;
	component: SvelteComponent;
}
