import { Circle } from './models/circle.model';
import { Line } from './models/line.model';
import { Rect } from './models/rect.model';
import { distanceBetween, Point } from './models/shape.model';

export class DetectCollision {
  static isCircleAndCircleCollision(circle1: Circle, circle2: Circle): boolean {
    const distance = distanceBetween(circle1.center, circle2.center);
    return distance <= circle1.radius + circle2.radius;
  }

  static isCircleAndRectCollision(cirlce: Circle, rect: Rect): boolean {
    const pointDistance: Point = <Point>{
      x: Math.abs(cirlce.center.x - rect.center.x),
      y: Math.abs(cirlce.center.y - rect.center.y),
    };

    if (pointDistance.x > rect.width / 2 + cirlce.radius) {
      return false;
    } else if (pointDistance.y > rect.height / 2 + cirlce.radius) {
      return false;
    } else if (pointDistance.x <= rect.width / 2) {
      return true;
    } else if (pointDistance.y <= rect.height / 2) {
      return true;
    }

    const circleToRectDistance =
      Math.pow(pointDistance.x - rect.width / 2, 2) +
      Math.pow(pointDistance.y - rect.height / 2, 2);

    return circleToRectDistance <= Math.pow(cirlce.radius, 2);
  }

  static isRectAndRectCollision(rect1: Rect, rect2: Rect): boolean {
    if (
      rect1.center.x < rect2.center.x + rect2.width &&
      rect1.center.x + rect2.width > rect2.center.x &&
      rect1.center.y < rect2.center.y + rect2.height &&
      rect1.height + rect2.center.y > rect2.center.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  static isLineAndLineCollision(line1: Line, line2: Line): boolean {
    const uA =
      ((line2.x2 - line2.center.x) * (line1.center.y - line2.center.y) -
        (line2.y2 - line2.center.y) * (line1.center.x - line2.center.x)) /
      ((line2.y2 - line2.center.y) * (line1.x2 - line1.center.x) -
        (line2.x2 - line2.center.x) * (line1.y2 - line1.center.y));
    const uB =
      ((line1.x2 - line1.center.x) * (line1.center.y - line2.center.y) -
        (line1.y2 - line1.center.y) * (line1.center.x - line2.center.x)) /
      ((line2.y2 - line2.center.y) * (line1.x2 - line1.center.x) -
        (line2.x2 - line2.center.x) * (line1.y2 - line1.center.y));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
    return false;
  }
  static isCircleAndLineCollision(circle: Circle, line: Line): boolean {
    // is either end INSIDE the circle?
    // if so, return true immediately
    const inside1 = pointCircle(
      line.center.x,
      line.center.y,
      circle.center.x,
      circle.center.y,
      circle.radius,
    );
    const inside2 = pointCircle(
      line.x2,
      line.y2,
      circle.center.x,
      circle.center.y,
      circle.radius,
    );
    if (inside1 || inside2) return true;

    // get length of the line
    let distX = line.center.x - line.x2;
    let distY = line.center.y - line.y2;
    const len = Math.sqrt(distX * distX + distY * distY);

    // get dot product of the line and circle
    const dot =
      ((circle.center.x - line.center.x) * (line.x2 - line.center.x) +
        (circle.center.y - line.center.y) * (line.y2 - line.center.y)) /
      Math.pow(len, 2);

    // find the closest point on the line
    const closestX = line.center.x + dot * (line.x2 - line.center.x);
    const closestY = line.center.y + dot * (line.y2 - line.center.y);

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    const onSegment = linePoint(
      line.center.x,
      line.center.x,
      line.x2,
      line.y2,
      closestX,
      closestY,
    );
    if (!onSegment) return false;

    // get distance to closest point
    distX = closestX - circle.center.x;
    distY = closestY - circle.center.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance <= circle.radius) {
      return true;
    }
    return false;
  }
  static isRectAndLineCollision(rect: Rect, line: Line): boolean {
    const all_points = return_all_four_points(
      rect.center.x,
      rect.center.y,
      rect.width,
      rect.height,
    );

    //max x co-oridinate ;
    let rectangleMaxX: number;
    let rectangleMinX: number;
    let rectangleMaxY: number;
    let rectangleMinY: number;

    if (all_points.x2 > all_points.x1) {
      rectangleMaxX = all_points.x2;
      rectangleMinX = all_points.x1;
    } else {
      rectangleMinX = all_points.x2;
      rectangleMaxX = all_points.x1;
    }

    if (all_points.y2 > all_points.y1) {
      rectangleMaxX = all_points.y2;
      rectangleMinX = all_points.y1;
    } else {
      rectangleMaxX = all_points.y1;
      rectangleMinX = all_points.y2;
    }

    let minX = line.center.x;
    let maxX = line.x2;

    if (line.center.x > line.x2) {
      minX = line.x2;
      maxX = line.center.x;
    }

    // Find the intersection of the segment's and rectangle's x-projections
    if (maxX > rectangleMaxX) {
      maxX = rectangleMaxX;
    }

    if (minX < rectangleMinX) {
      minX = rectangleMinX;
    }

    if (minX > maxX) {
      // If their projections do not intersect return false
      return false;
    }

    // Find corresponding min and max Y for min and max X we found before
    let minY = line.center.y;
    let maxY = line.y2;

    const dx = line.center.x - line.x2;

    if (Math.abs(dx) > 0.0000001) {
      const a = (all_points.y2 - all_points.y1) / dx;
      const b = all_points.y1 - a * line.center.x;
      minY = a * minX + b;
      maxY = a * maxX + b;
    }

    if (minY > maxY) {
      const tmp = maxY;
      maxY = minY;
      minY = tmp;
    }

    // Find the intersection of the segment's and rectangle's y-projections
    if (maxY > rectangleMaxY) {
      maxY = rectangleMaxY;
    }

    if (minY < rectangleMinY) {
      minY = rectangleMinY;
    }

    if (minY > maxY) {
      // If Y-projections do not intersect return false
      return false;
    }

    return true;
  }
}
function pointCircle(
  px: number,
  py: number,
  cx: number,
  cy: number,
  r: number,
): boolean {
  const distX = px - cx;
  const distY = py - cy;
  const distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}

function linePoint(x1: any, y1: any, x2: any, y2: any, px: number, py: number) {
  const d1 = dist(px, py, x1, y1);
  const d2 = dist(px, py, x2, y2);

  // get the length of the line
  const lineLen = dist(x1, y1, x2, y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  const buffer = 0.1; // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}

function dist(x1: any, y1: any, x2: any, y2: any) {
  const distX = x1 - x2;
  const distY = y1 - y2;
  return Math.sqrt(distX * distX + distY * distY);
}
function return_all_four_points(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const x1 = x;
  const y1 = y;

  const x2 = x;
  const y2 = y + width;

  const x4 = x2 + height;
  const y4 = y2;

  const x3 = x4;
  const y3 = y - height;

  return { x1, y1, x2, y2, x3, y3, x4, y4 };
}
