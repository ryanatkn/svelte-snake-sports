let _id = 0;

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

	loadState({x, y, prevX, prevY}: EntityState): void {
		this.x = x;
		this.y = y;
		this.prevX = prevX ?? x;
		this.prevY = prevY ?? y;
	}

	getState(): EntityState {
		const {x, y, prevX, prevY} = this;
		const state: EntityState = {x, y};
		if (prevX !== state.x) state.prevX = prevX;
		if (prevY !== state.y) state.prevY = prevY;
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
