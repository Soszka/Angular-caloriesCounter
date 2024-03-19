import { Injectable  } from '@angular/core'
import { BehaviorSubject, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MealElement {
  id: string;
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

  private elementDataSubject = new BehaviorSubject<MealElement[]>([]);
  elementData$ = this.elementDataSubject.asObservable();
  private selectedElementSubject = new BehaviorSubject<MealElement | null>(null);
  selectedElement$ = this.selectedElementSubject.asObservable();
  private editModeSubject = new BehaviorSubject<'edit' | 'add'>('add');
  editMode$ = this.editModeSubject.asObservable();
  loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateMeals();
  }

  setEditMode(mode: 'edit' | 'add') {
    this.editModeSubject.next(mode);
  }

  setSelectedElement(element: MealElement | null) {
    this.selectedElementSubject.next(element);
  }

  updateMeals() {
    const url = 'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json';
    this.http.get<MealElement[]>(url).subscribe({
      next: (data) => {
        this.elementDataSubject.next(data || []);
      },
      error: (error) => console.error('Wystąpił błąd przy ładowaniu produktów', error),
    });
  }

  removeMeal(element: MealElement) {
    const confirmation = confirm(`Czy na pewno chcesz usunąć produkt: ${element.name} z listy produktów?`);
    if (confirmation) {
      this.loadingSubject.next(true); 
      const currentData = this.elementDataSubject.value; 
      const updatedData = currentData.filter(item => item.id !== element.id);
      const url = 'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json';
      this.http.put(url, updatedData).subscribe({
        next: () => {
          this.elementDataSubject.next(updatedData); 
          this.loadingSubject.next(false); 
        },
        error: (error) => {
          console.error('Wystąpił błąd przy usuwaniu produktu', error);
          this.loadingSubject.next(false); 
        }
      });
    }
  }
  
  filterMeals(filterOptions: any) {
    this.loadingSubject.next(true);
    this.http.get<MealElement[]>(
      'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/.json'
    ).pipe(
      map(data => {
        const filteredElements = data.filter(element => {
          const caloriesCondition =
            (filterOptions.calories === "small" && element.calories < 300) ||
            (filterOptions.calories === "medium" && element.calories >= 300 && element.calories <= 700) ||
            (filterOptions.calories === "large" && element.calories > 700) ||
            !filterOptions.calories; 
          const kindCondition = !filterOptions.kind || element.kind === filterOptions.kind;
          const tasteCondition = !filterOptions.taste || element.taste === filterOptions.taste;
          return caloriesCondition && kindCondition && tasteCondition;
        });
        this.elementDataSubject.next(filteredElements);
      })
    ).subscribe(() => {
      this.loadingSubject.next(false);
    });
  }
}