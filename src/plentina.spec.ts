import { Test, TestingModule } from '@nestjs/testing';
import { DetectCollision } from './detectCollision.service';
import { Circle } from './models/circle.model';
import { Rect } from './models/rect.model';
import { PlentinaController } from './plentina.controller';
import { PlentinaService } from './plentina.service';

describe('PlentinaController', () => {
  let plentinaController: PlentinaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlentinaController],
      providers: [PlentinaService],
    }).compile();

    plentinaController = app.get<PlentinaController>(PlentinaController);
  });

  describe('/healthCheck', () => {
    it('Bhupesh Parakh', () => {
      const testResponse = {
        status: jest.fn(),
      };
      expect(plentinaController.healthCheck(testResponse as any)).toStrictEqual(
        {
          name: 'Bhupesh Parakh',
        },
      );
    });
  });
});

describe('Collision Detection', () => {
  describe('doesCircleAndRectCollide', () => {
    const circle = new Circle(10, 10, 2);

    describe('a colliding circle and rectangle', () => {
      const rectangle = new Rect(9, 9, 1, 1);

      it('should return true', () => {
        expect(DetectCollision.isCircleAndRectCollision(circle, rectangle))
          .toBeTruthy;
      });
    });

    describe('a non-colliding circle and rectangle', () => {
      const rectangle = new Rect(5, 5, 2, 2);

      it('should return false', () => {
        expect(DetectCollision.isCircleAndRectCollision(circle, rectangle))
          .toBeFalsy;
      });
    });
  });

  describe('doesCircleAndCircleCollide', () => {
    const circle1 = new Circle(10, 10, 1);

    describe('two colliding circles', () => {
      [
        new Circle(12, 10, 1),
        new Circle(10, 12, 1),
        new Circle(11, 11, 1),
      ].forEach((circle2) => {
        it(`should return true for ${JSON.stringify(circle2)}`, () => {
          expect(DetectCollision.isCircleAndCircleCollision(circle1, circle2))
            .toBeTruthy;
        });
      });
    });

    describe('two non-colliding circles', () => {
      const circle2 = new Circle(5, 5, 1);

      it(`should return false for ${JSON.stringify(circle2)}`, () => {
        expect(DetectCollision.isCircleAndCircleCollision(circle1, circle2))
          .toBeFalsy;
      });
    });
  });

  describe('doesRectAndRectCollide', () => {
    const rectangle1 = new Rect(9, 9, 1, 1);

    describe('two colliding rectangles', () => {
      const rectangle2 = new Rect(10, 10, 2, 2);
      it('should return true', () => {
        expect(DetectCollision.isRectAndRectCollision(rectangle1, rectangle2))
          .toBeTruthy;
      });
    });

    describe('two non-colliding rectangles', () => {
      const rectangle2 = new Rect(4, 4, 2, 2);
      it('should return false', () => {
        expect(DetectCollision.isRectAndRectCollision(rectangle1, rectangle2))
          .toBeFalsy;
      });
    });
  });
});
