let _id = 0;

export const ENTITY_DEFAULT_WIDTH = 32; // width in pixels of one entity (also assumed to be one tile)
export const ENTITY_DEFAULT_HEIGHT = 32; // height in pixels of one entity (also assumed to be one tile)

export type Direction = 'left' | 'right' | 'up' | 'down';

export interface EntityState {
	x: number;
	y: number;
	prevX?: number; // TODO maybe store a variable-length history instead of these
	prevY?: number; // TODO maybe store a variable-length history instead of these
	width?: number;
	height?: number;
}

// TODO separate implementation?

export class Entity {
	constructor(state: EntityState) {
		this.loadState(state);
	}

	id = _id++;

	// these get initialized by the constructor with `loadState`
	x!: number;
	y!: number;
	prevX!: number;
	prevY!: number;
	width!: number;
	height!: number;

	loadState({x, y, prevX, prevY, width, height}: EntityState): void {
		this.x = x;
		this.y = y;
		this.prevX = prevX ?? x;
		this.prevY = prevY ?? y;
		this.width = width ?? ENTITY_DEFAULT_WIDTH;
		this.height = height ?? ENTITY_DEFAULT_HEIGHT;
	}

	getState(): EntityState {
		const {x, y, prevX, prevY, width, height} = this;
		const state: EntityState = {x, y};
		if (prevX !== state.x) state.prevX = prevX;
		if (prevY !== state.y) state.prevY = prevY;
		if (width !== ENTITY_DEFAULT_WIDTH) state.width = width;
		if (height !== ENTITY_DEFAULT_WIDTH) state.height = height;
		return state;
	}

	clone(): Entity {
		return new Entity(this.getState());
	}

	moveTo(x: number, y: number): void {
		this.prevX = this.x;
		this.prevY = this.y;
		this.x = x;
		this.y = y;
	}

	moveBy(x: number, y: number): void {
		this.moveTo(this.x + x, this.y + y);
	}

	moveDir(dir: Direction): void {
		switch (dir) {
			case 'left':
				return this.moveBy(-1, 0);
			case 'right':
				return this.moveBy(1, 0);
			case 'up':
				return this.moveBy(0, -1);
			case 'down':
				return this.moveBy(0, 1);
			default:
				throw new Error('Unknown movement direction ' + dir);
		}
	}

	isOutOfBounds(mapHeight: number, mapWidth: number): boolean {
		return this.x < 0 || this.y < 0 || this.x >= mapWidth || this.y >= mapHeight;
	}

	isCollidingWith(entity: Entity): boolean {
		return this.isAt(entity.x, entity.y);
	}

	isAt(x: number, y: number): boolean {
		return this.x === x && this.y === y;
	}
}
