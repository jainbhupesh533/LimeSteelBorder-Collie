import { Circle } from './circle.model';
import { Point, Shape, Type } from './shape.model';

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const circle: Circle = Circle.fromShape(other);
        const target: Point = circle.center;
        const pointDistance: Point = <Point>{
          x: Math.abs(this.center.x - target.x),
          y: Math.abs(this.center.y - target.y),
        };

        if (pointDistance.x > this.width / 2 + circle.radius) {
          return false;
        } else if (pointDistance.y > this.height / 2 + circle.radius) {
          return false;
        } else if (pointDistance.x <= this.width / 2) {
          return true;
        } else if (pointDistance.y <= this.height / 2) {
          return true;
        }

        const circleToRectDistance =
          Math.pow(pointDistance.x - this.width / 2, 2) +
          Math.pow(pointDistance.y - this.height / 2, 2);

        return circleToRectDistance <= Math.pow(circle.radius, 2);
      case Type.RECT:
        const _other = <Rect>(<any>other);
        if (
          this.center.x < _other.center.x + _other.width &&
          this.center.x + this.width > _other.center.x &&
          this.center.y < _other.center.y + _other.height &&
          this.height + this.center.y > _other.center.y
        ) {
          return true;
        } else {
          return false;
        }
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}
