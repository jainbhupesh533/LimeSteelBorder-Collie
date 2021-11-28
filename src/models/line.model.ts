import { Rect } from './rect.model';
import { Circle } from './circle.model';
import { distanceBetween, Point, Shape, Type } from './shape.model';

export class Line implements Shape {
  readonly center: Point;
  readonly a: Point;
  readonly b: Point;
  readonly c: Point;
  readonly d: Point;
  readonly x2: number;
  readonly y2: number;

  readonly type: Type;

  constructor(x:number,y:number,x2:number,y2:number) {
    this.a = <Point>{ x, y };
    this.type = Type.LINE;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.LINE:

      case Type.CIRCLE:

      case Type.RECT:

      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Circle object
   */
  static fromShape(other: Shape): Circle {
    const polymorph = <any>other;
    if (!polymorph.radius) {
      throw new Error('Shape is invalid! Cannot convert to a Circle');
    }

    return new Circle(polymorph.center.x, polymorph.center.y, polymorph.radius);
  }
}
