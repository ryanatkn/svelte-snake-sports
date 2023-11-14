export type Direction = 'left' | 'right' | 'up' | 'down';
export const directions: Direction[] = ['left', 'right', 'up', 'down'];
export const verticalDirections: Direction[] = ['up', 'down'];
export const horizontalDirections: Direction[] = ['left', 'right'];

export const toDirection = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
): Direction | undefined => {
	const dx = x2 - x1;
	const dy = y2 - y1;
	if (dx === 0 && dy === 0) return undefined;
	return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up';
};

export const areOpposites = (a: Direction, b: Direction): boolean =>
	a === 'up'
		? b === 'down'
		: a === 'down'
		  ? b === 'up'
		  : a === 'left'
		    ? b === 'right'
		    : b === 'left';
