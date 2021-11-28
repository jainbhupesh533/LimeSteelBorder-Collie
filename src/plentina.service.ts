import { Injectable } from '@nestjs/common';
import { DetectCollision } from './detectCollision.service';
import { Circle } from './models/circle.model';
import { Rect } from './models/rect.model';
import {
  CollideShapesRequest,
  CollideShapesResponse,
  ShapeDTO,
} from './plentina.controller';

@Injectable()
export class PlentinaService {
  /**
   * Simple health check
   * @returns the applicant's name
   */
  healthCheck(): string {
    return 'Bhupesh Parakh';
  }

  doShapesCollide(request: CollideShapesRequest): CollideShapesResponse {
    let result = false;
    if (request.firstShape.radius && request.secondShape.radius) {
      result = this.doesCircleAndCircleCollide(
        request.firstShape,
        request.secondShape,
      );
    } else if (
      request.firstShape.radius &&
      request.secondShape.width &&
      request.secondShape.height
    ) {
      result = this.doesCircleAndRectCollide(
        request.firstShape,
        request.secondShape,
      );
    } else if (
      request.firstShape.width &&
      request.firstShape.height &&
      request.secondShape.radius
    ) {
      result = this.doesCircleAndRectCollide(
        request.secondShape,
        request.firstShape,
      );
    } else if (
      request.firstShape.width &&
      request.firstShape.height &&
      request.secondShape.width &&
      request.secondShape.height
    ) {
      result = this.doesRectAndRectCollide(
        request.firstShape,
        request.secondShape,
      );
    } else {
      throw new Error('Invalid shapes!');
    }

    return <CollideShapesResponse>{
      collides: result,
      firstShape: request.firstShape,
      secondShape: request.secondShape,
    };
  }

  /**
   * Checks if a circle and a rectangle collide
   * @description the order of variables matter
   * @param  circle1 shapeDTO which will be used to create
   * @param rect1 shapeDTO which will used to create rectangle
   * @returns a boolean if they collide or not
   */
  doesCircleAndRectCollide(circle1: ShapeDTO, rect1: ShapeDTO): boolean {
    const circle = Circle.fromShapeDTO(circle1);
    const rect = Rect.fromShapeDto(rect1);

    return DetectCollision.isCircleAndRectCollision(circle, rect);
  }

  /**
   * Checks if a circle and another circle collide
   * @param shape1 ShapeDTO will be used to create circle object for input
   * @param shape2 ShapeDTO will be used to create circle object for input
   * @returns a boolean if they collide or not
   */
  doesCircleAndCircleCollide(shape1: ShapeDTO, shape2: ShapeDTO): boolean {
    const circle1 = Circle.fromShapeDTO(shape1);
    const circle2 = Circle.fromShapeDTO(shape2);
    return DetectCollision.isCircleAndCircleCollision(circle1, circle2);
  }

  /**
   * Checks if a rectangle and a second rectangle collide
   * @param shape1 ShapeDTO object which will be used to create rectangle
   * @param shape2 ShapeDTO object which will be used to create rectangle
   * @returns a boolean if they collide or not
   */
  doesRectAndRectCollide(shape1: ShapeDTO, shape2: ShapeDTO): boolean {
    const rect1 = Rect.fromShapeDto(shape1);
    const rect2 = Rect.fromShapeDto(shape2);

    return DetectCollision.isRectAndRectCollision(rect1, rect2);
  }
}
