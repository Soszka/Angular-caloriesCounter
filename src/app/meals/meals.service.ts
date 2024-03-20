import { Injectable  } from '@angular/core'
import { BehaviorSubject, Subject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MealElement {
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
  kind: string;
  taste: string
}

@Injectable()
export class MealsService {

  private originalElementDataSubject = new BehaviorSubject<MealElement[]>([]);
  private elementDataSubject = new BehaviorSubject<MealElement[]>([]);
  elementData$ = this.elementDataSubject.asObservable();
  private selectedElementSubject = new BehaviorSubject<MealElement | null>(null);
  selectedElement$ = this.selectedElementSubject.asObservable();
  private editModeSubject = new BehaviorSubject<'edit' | 'add'>('add');
  editMode$ = this.editModeSubject.asObservable();
  loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();
  private currentFilterOptions: any = null;

  constructor(private http: HttpClient) {
    this.fetchMeals();
  }

  setEditMode(mode: 'edit' | 'add') {
    this.editModeSubject.next(mode);
  }

  setSelectedElement(element: MealElement | null) {
    this.selectedElementSubject.next(element);
  }

  fetchMeals() {
    const url = 'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json';
    this.http.get<MealElement[]>(url).subscribe({
      next: (data) => {
        const meals = data || [];
        this.originalElementDataSubject.next(meals); 
        this.elementDataSubject.next(meals);
    }});
  }

  removeMeal(meal: MealElement): void {
    const confirmation = confirm(`Czy na pewno chcesz usunąć produkt: ${meal.name} z listy produktów?`);
    if (confirmation) {
      this.loadingSubject.next(true); 
      const currentMeals = this.originalElementDataSubject.value;
      const updatedMeals = currentMeals.filter(item => item.name !== meal.name);
      this.updateMealsOnServer(updatedMeals).subscribe({
        next: () => {
          this.loadingSubject.next(false); 
      }});
    }
  }
  
  addMeal(meal: MealElement): Observable<any> {
    this.loadingSubject.next(true); 
    const currentMeals = this.elementDataSubject.value;
    const updatedMeals = [...currentMeals, meal];
    return this.updateMealsOnServer(updatedMeals).pipe(
      tap({
        next: () => this.loadingSubject.next(false)
      })
    );
  }
  
  updateMeal(meal: MealElement): Observable<any> {
    this.loadingSubject.next(true); 
    const currentMeals = this.elementDataSubject.value;
    const updatedMeals = currentMeals.map(item => item.name === meal.name ? meal : item);
    return this.updateMealsOnServer(updatedMeals).pipe(
      tap({
        next: () => this.loadingSubject.next(false)
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
        }
        this.loadingSubject.next(false); 
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