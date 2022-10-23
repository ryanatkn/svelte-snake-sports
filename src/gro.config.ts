import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

const files = ['lib/index.ts', 'lib/ui/style.css'];

export const config: GroConfigCreator = async ({dev}) => {
	const partial: GroConfigPartial = {
		builds: [dev ? null : {name: 'library', platform: 'node', input: files}],
		types: false,
	};
	return partial;
};
