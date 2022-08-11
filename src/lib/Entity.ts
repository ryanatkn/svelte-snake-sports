let _id = 0;

export type Direction = 'left' | 'right' | 'up' | 'down';
export const directions: Direction[] = ['left', 'right', 'up', 'down'];
export const verticalDirections: Direction[] = ['up', 'down'];
export const horizontalDirections: Direction[] = ['left', 'right'];

// TODO separate implementation?

export class Entity {
	constructor(
		public x: number,
		public y: number,
		public prevX = x,
		public prevY = y,
		public id = _id++,
	) {}

	clone(id = false): Entity {
		return new Entity(this.x, this.y, this.prevX, this.prevY, id ? this.id : undefined);
	}

	moveTo(x: number, y: number): Entity {
		this.prevX = this.x;
		this.prevY = this.y;
		this.x = x;
		this.y = y;
		return this;
	}

	moveBy(x: number, y: number): Entity {
		this.moveTo(this.x + x, this.y + y);
		return this;
	}

	moveDir(dir: Direction): Entity {
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
