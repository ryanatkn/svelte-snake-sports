import type {GroConfigCreator, GroConfigPartial} from '@feltjs/gro';

const files = ['lib/index.ts', 'lib/style.css'];

const config: GroConfigCreator = async ({dev}) => {
	const partial: GroConfigPartial = {
		builds: [dev ? null : {name: 'library', platform: 'node', input: files}],
	};
	return partial;
};

export default config;
