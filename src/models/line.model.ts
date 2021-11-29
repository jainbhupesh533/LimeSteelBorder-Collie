import { ShapeDTO } from 'src/plentina.controller';
import { Point, Shape, Type } from './shape.model';

export class Line implements Shape {
  readonly center: Point;
  readonly x2: number;
  readonly y2: number;
  readonly type: Type;

  constructor(x: number, y: number, x2: number, y2: number) {
    this.center = <Point>{ x, y };
    this.x2 = x2;
    this.y2 = y2;
    this.type = Type.LINE;
  }

  // use height and width as (x2,y2) as line endpoint
  /**
   * Create a rect object from shapeDTO
   * @param shape a ShapeDTO object as input
   * @returns a LINE object
   */

  static fromShapeDTO(shape: ShapeDTO): Line {
    if (!shape.width || !shape.height) {
      throw new Error('ShapeDTO Cannot convert to a Line');
    }
    return new Line(shape.x, shape.y, shape.width, shape.height);
  }
}
