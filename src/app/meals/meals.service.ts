import { Injectable  } from '@angular/core'
import { BehaviorSubject, Subject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

export interface MealElement {
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
  kind: string;
  taste: string
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  private originalElementDataSubject = new BehaviorSubject<MealElement[]>([]);
  private elementDataSubject = new BehaviorSubject<MealElement[]>([]);
  elementData$ = this.elementDataSubject.asObservable();
  private selectedElementSubject = new BehaviorSubject<MealElement | null>(null);
  selectedElement$ = this.selectedElementSubject.asObservable();
  private editModeSubject = new BehaviorSubject<'edit' | 'add'>('add');
  editMode$ = this.editModeSubject.asObservable();
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();
  private currentFilterOptions: any = null;
  private mealsUrl = 'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json';

  constructor(private http: HttpClient) {}

  setEditMode(mode: 'edit' | 'add') {
    this.editModeSubject.next(mode);
  }

  setSelectedElement(element: MealElement | null) {
    this.selectedElementSubject.next(element);
  }

  fetchMeals(): Observable<MealElement[]> { 
    return this.http.get<MealElement[]>(this.mealsUrl).pipe( 
      tap((data: MealElement[]) => {
        this.originalElementDataSubject.next(data || []); 
        this.elementDataSubject.next(data || []);
      })
    );
  }

  removeMeal(meal: MealElement): Observable<any> {
    this.loadingSubject.next(true);
    const currentMeals = this.originalElementDataSubject.value;
    const updatedMeals = currentMeals.filter(item => item.name !== meal.name);
    return this.updateMealsOnServer(updatedMeals).pipe(
      tap({
        next: () => {
          this.loadingSubject.next(false);
          this.elementDataSubject.next(updatedMeals);
        }
      })
    );
  }
  
  addMeal(meal: MealElement): Observable<any> {
    this.loadingSubject.next(true); 
    const currentMeals = this.originalElementDataSubject.value;
    const updatedMeals = [...currentMeals, meal];
    return this.updateMealsOnServer(updatedMeals).pipe(
      tap({
        next: () => {
          this.loadingSubject.next(false);
          this.elementDataSubject.next(updatedMeals);
        }
      })
    );
  }
  
  updateMeal(meal: MealElement): Observable<any> {
    this.loadingSubject.next(true); 
    const currentMeals = this.originalElementDataSubject.value;
    const updatedMeals = currentMeals.map(item => item.name === meal.name ? meal : item);
    return this.updateMealsOnServer(updatedMeals).pipe(
      tap({
        next: () => {
          this.loadingSubject.next(false);
          this.elementDataSubject.next(updatedMeals);
        }
      })
    );
  }
  
  private updateMealsOnServer(meals: MealElement[]): Observable<any> {
    const url = 'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json';
    return this.http.put(url, meals).pipe(
      tap(() => {
        this.originalElementDataSubject.next(meals);
        if (this.currentFilterOptions) {
          const filteredMeals = this.applyFilter(meals, this.currentFilterOptions);
          this.elementDataSubject.next(filteredMeals);
        } else {
          this.elementDataSubject.next(meals);
          this.originalElementDataSubject.next(meals);
        }
      })
    );
  }

  private applyFilter(elements: MealElement[], filterOptions: any): MealElement[] {
    return elements.filter(element => {
      const caloriesCondition =
        (filterOptions.calories === "small" && element.calories < 300) ||
        (filterOptions.calories === "medium" && element.calories >= 300 && element.calories <= 700) ||
        (filterOptions.calories === "large" && element.calories > 700) ||
        !filterOptions.calories; 
      const kindCondition = !filterOptions.kind || element.kind === filterOptions.kind;
      const tasteCondition = !filterOptions.taste || element.taste === filterOptions.taste;
      return caloriesCondition && kindCondition && tasteCondition;
    });
  }

  filterMeals(filterOptions: any) {
    this.loadingSubject.next(true);
    this.currentFilterOptions = filterOptions; 
    this.http.get<MealElement[]>(
      'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json'
    ).pipe(
      map(data => {
        const filteredElements = this.applyFilter(data, filterOptions);
        this.elementDataSubject.next(filteredElements);
      })
    ).subscribe(() => {
      this.loadingSubject.next(false);
    });
  }
}