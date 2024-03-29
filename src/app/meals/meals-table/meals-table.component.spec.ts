import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealsTableComponent } from './meals-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MealsService } from '../meals.service';
import { AuthService } from '../../auth/auth.service';

describe('MealsTableComponent', () => {
  let component: MealsTableComponent;
  let fixture: ComponentFixture<MealsTableComponent>;
  let authServiceMock: any;
  let mealsServiceMock: any;
  let caloriesServiceMock: any;

  beforeEach(async () => {

    authServiceMock = {
      isLoggedIn$: of(true)
    };

    mealsServiceMock = {
      loading$: of(false),
      elementData$: of([]),
      setEditMode: jasmine.createSpy(),
      setSelectedElement: jasmine.createSpy(),
      removeMeal: jasmine.createSpy().and.returnValue(of({}))
    };

    caloriesServiceMock = {
      addElement: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatTableModule, MatPaginatorModule, BrowserAnimationsModule],
      declarations: [MealsTableComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: MealsService, useValue: mealsServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MealsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the edit page on add meal if logged in', () => {
    component.onAddMeal();
    expect(mealsServiceMock.setEditMode).toHaveBeenCalledWith('add');
    expect(mealsServiceMock.setSelectedElement).toHaveBeenCalledWith(null);
  });

  it('should display message and not navigate if not logged in on add meal', () => {
    authServiceMock.isLoggedIn$ = of(false);
    component.onAddMeal();
    expect(component.showMessage).toBeTrue();
    expect(component.messageInfo).toContain('Musisz się zalogować');
  });

  it('should apply filter to data source', () => {
    const filterValue = 'test';
    component.applyFilter({
      target: { value: filterValue } 
    } as unknown as Event); 
    expect(component.dataSource.filter).toBe(filterValue.trim().toLowerCase());
  });
});