import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MealsEditComponent } from './meals-edit.component';
import { MealsService } from '../meals.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MealElement } from '../meals.service';

describe('MealsEditComponent', () => {
  let component: MealsEditComponent;
  let fixture: ComponentFixture<MealsEditComponent>;
  let mealsServiceMock: any;

  beforeEach(async () => {
    mealsServiceMock = {
      selectedElement$: of(null),
      updateMeal: jasmine.createSpy().and.returnValue(of({})),
      addMeal: jasmine.createSpy().and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [ MealsEditComponent ],
      providers: [
        { provide: MealsService, useValue: mealsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MealsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set edit mode to false for adding new meal', () => {
    expect(component.editMode).toBeFalse();
  });

  it('should update form values when in edit mode', () => {
    const testMeal: MealElement = {
      name: 'Test Meal',
      calories: 100,
      carbohydrates: 20,
      protein: 10,
      fats: 5,
      kind: 'snack',
      taste: 'sweet'
    };
    mealsServiceMock.selectedElement$ = of(testMeal);
    component.ngOnInit(); 
    fixture.detectChanges();

    expect(component.mealForm.value).toEqual({
      name: testMeal.name,
      calories: testMeal.calories,
      kind: testMeal.kind,
      taste: testMeal.taste,
      protein: testMeal.protein,
      fats: testMeal.fats,
      carbohydrates: testMeal.carbohydrates
    });
  });

  it('should call addMeal on save when not in edit mode', () => {
    component.onSaveClick();
    expect(mealsServiceMock.addMeal).toHaveBeenCalled();
  });
});