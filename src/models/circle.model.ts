import { ShapeDTO } from 'src/plentina.controller';
import { Point, Shape, Type } from './shape.model';

export class Circle implements Shape {
  readonly center: Point;
  readonly radius: number;
  readonly type: Type;

  constructor(x: number, y: number, radius: number) {
    this.center = <Point>{ x, y };
    this.type = Type.CIRCLE;
    this.radius = radius;
  }

  /**
   * Create Circle from ShapeDTO
   * @param shape the ShapeDTO object
   * @return a circle object
   */
  static fromShapeDTO(shape: ShapeDTO) {
    if (!shape.radius) {
      throw new Error('ShapeDTO Cannot convert to a Circle');
    }
    return new Circle(shape.x, shape.y, shape.radius);
  }
}
