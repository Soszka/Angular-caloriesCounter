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
  
  private elementsData!: MealElement[] 

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
    this.loadingSubject.next(true);
    this.http.get<{ [key: string]: MealElement }>(
      'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/meals/-Nt0MsmPKnIYx5z6t0ZL.json'
    ).subscribe(data => {
      const meals: MealElement[] = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          meals.push({ ...data[key], id: key });
        }
      }
      this.elementsData = meals;
      this.elementDataSubject.next(this.elementsData);
      this.loadingSubject.next(false);
    });
  }

  removeMeal(element: MealElement) {
    const confirmation = confirm(`Czy na pewno chcesz usunąć produkt: ${element.name} z listy produktów?`);
    if (confirmation) {
      this.loadingSubject.next(true);
      const url = `https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/meals/-Nt0MsmPKnIYx5z6t0ZL/${element.id}.json`;
      this.http.delete(url).subscribe({
        next: () => {
          this.fetchMeals();
          this.loadingSubject.next(false);
        },
        error: (error) => {
          console.error("Wystąpił błąd przy usuwaniu produktu", error);
          this.loadingSubject.next(false);
        }
      });
    }
  }
  
  filterMeals(filterOptions: any) {
    this.loadingSubject.next(true);
    this.http.get<MealElement[]>(
      'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/meals/-Nt0MsmPKnIYx5z6t0ZL.json'
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