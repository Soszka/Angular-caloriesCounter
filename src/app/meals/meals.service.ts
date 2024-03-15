import { Injectable  } from '@angular/core'
import { BehaviorSubject, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MealElement {
  id: number
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

  loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();
  
  private elementsData!: MealElement[] 

  constructor(private http: HttpClient) {
    this.fetchMeals();
  }

  setSelectedElement(element: MealElement) {
    this.selectedElementSubject.next(element);
  }

  fetchMeals() {
    this.loadingSubject.next(true); 
    this.http.get<MealElement[]>(
      'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/meals/-Nt0MsmPKnIYx5z6t0ZL.json'
    ).subscribe(data => {
      this.elementsData = data;
      this.elementDataSubject.next(this.elementsData);
      this.loadingSubject.next(false); 
    });
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