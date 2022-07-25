let _id = 0;

export const ENTITY_DEFAULT_WIDTH = 32; // width in pixels of one entity (also assumed to be one tile)
export const ENTITY_DEFAULT_HEIGHT = 32; // height in pixels of one entity (also assumed to be one tile)

export type Direction = 'left' | 'right' | 'up' | 'down';

export class Entity {
	constructor(x: number, y: number) {
		if (x) {
			this.x = x;
		}
		if (y) {
			this.y = y;
		}
		this.prevX = this.x;
		this.prevY = this.y;
	}

	id = _id++;
	x = 0;
	y = 0;
	prevX = 0;
	prevY = 0;
	width = ENTITY_DEFAULT_WIDTH;
	height = ENTITY_DEFAULT_HEIGHT;

	clone(): Entity {
		const e = new Entity(this.x, this.y);
		e.prevX = this.prevX;
		e.prevY = this.prevY;
		e.width = this.width;
		e.height = this.height;
		return e;
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
