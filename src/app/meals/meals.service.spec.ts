import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealsService } from './meals.service';
import { MealElement } from './meals.service';

describe('MealsService', () => {
  let service: MealsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MealsService]
    });
    service = TestBed.inject(MealsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchMeals should retrieve meals from the API', () => {
    const testMeals = [
      { name: 'Meal 1', calories: 100, carbohydrates: 20, protein: 10, fats: 5, kind: 'snack', taste: 'sweet' },
      { name: 'Meal 2', calories: 200, carbohydrates: 40, protein: 20, fats: 10, kind: 'lunch', taste: 'salty' }
    ];

    service.fetchMeals().subscribe(meals => {
      expect(meals.length).toBe(2);
      expect(meals).toEqual(testMeals);
    });

    const req = httpTestingController.expectOne(service['mealsUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(testMeals);
  });
});