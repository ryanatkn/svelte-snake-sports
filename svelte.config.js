import {typescript} from 'svelte-preprocess-esbuild';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV !== 'production'; // see below

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: typescript(),
	compilerOptions: {
		immutable: false,
	},
	kit: {
		adapter: adapter(),
		paths: dev ? undefined : {base: '/svelte-snake-sports'}, // for GitHub pages -- delete this line for top-level domains
		files: {assets: 'src/static'},
		prerender: {default: true},
	},
};
