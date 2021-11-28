import { ShapeDTO } from 'src/plentina.controller';
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

  /**
   * Create a rect object from shapeDTO
   * @param shape a ShapeDTO object as input
   * @returns a rect object
   */

  static fromShapeDto(shape: ShapeDTO): Rect {
    if (!shape.width || !shape.height) {
      throw new Error('ShapeDTO Cannot convert to a Rectangle');
    }
    return new Rect(shape.x, shape.y, shape.width, shape.height);
  }
}
