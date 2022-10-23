import type {GroConfigCreator, GroConfigPartial} from '@feltcoop/gro';

export const config: GroConfigCreator = async () => {
	const partial: GroConfigPartial = {
		types: false,
	};
	return partial;
};
