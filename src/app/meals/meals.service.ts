import { Injectable  } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs';
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
    this.updateElementData(this.elementsData);
    this.fetchMeals();
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
    let loadingTimer;
    if (loading) {
      loadingTimer = setTimeout(() => {
        this.loadingSubject.next(false);
      }, 1500);
    } else {
      clearTimeout(loadingTimer);
    }
  }

  updateElementData(data: MealElement[]) {
    this.elementDataSubject.next(data);
  }

  setSelectedElement(element: MealElement) {
    this.selectedElementSubject.next(element);
  }

  fetchMeals() {
    this.http.get<MealElement[]>(
      'https://calories-counter-e6ab6-default-rtdb.europe-west1.firebasedatabase.app/meals/-Nt0MsmPKnIYx5z6t0ZL.json'
    ).subscribe(data => {
      console.log(data);
      this.elementsData = data;
      this.elementDataSubject.next(this.elementsData);
    });
  }

  filterMeals(filterOptions: any) {
    const mealElements: MealElement[] = this.elementsData;
    console.log(filterOptions);
    const filteredElements = mealElements.filter(element => {
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
  }
}

