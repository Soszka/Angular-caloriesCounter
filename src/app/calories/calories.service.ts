import { Injectable, } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AddedMeal } from '../meals/meal.model';


@Injectable({
  providedIn: 'root'
})
export class CaloriesService  {
  private addedElementsSubject = new BehaviorSubject<AddedMeal[]>([]);
  addedElements$ = this.addedElementsSubject.asObservable();
  private diagramDataSubject = new BehaviorSubject<any>(null);
  diagramData$ = this.diagramDataSubject.asObservable();
  private totalNutrientsSubject = new BehaviorSubject<any>({
    totalProtein: 0,
    totalFat: 0,
    totalCarbohydrates: 0,
    totalCalories: 0
  });
  totalNutrients$ = this.totalNutrientsSubject.asObservable();
  private updateCaloriesMessageSubject = new Subject<void>();
  updateCaloriesMessage$ = this.updateCaloriesMessageSubject.asObservable();

  
  constructor() {}

  addElement(element: AddedMeal) {
    const currentElements = this.addedElementsSubject.value;
    const updatedElements = [...currentElements, element];
    this.addedElementsSubject.next(updatedElements);
    this.calculateTotalNutrients();
  }

  callUpdateCaloriesMessage() {
    this.updateCaloriesMessageSubject.next();
  }

  calculateTotalNutrients() {
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbohydrates = 0;
    let totalCalories = 0;

    this.addedElementsSubject.value.forEach(element => {
      totalProtein += element.protein;
      totalFat += element.fats;
      totalCarbohydrates += element.carbohydrates;
      totalCalories += element.calories;
    });

    this.totalNutrientsSubject.next({
      totalProtein,
      totalFat,
      totalCarbohydrates,
      totalCalories
    });
  }

  addDiagramData(data: any) {
    this.diagramDataSubject.next(data);
  }

  removeElement(element: AddedMeal) {
    const currentElements = this.addedElementsSubject.value;
    const index = currentElements.indexOf(element);

    if (index !== -1) {
      currentElements.splice(index, 1);
      this.addedElementsSubject.next(currentElements);
      this.calculateTotalNutrients();
    }
  }

  clearTable() {
    this.addedElementsSubject.next([]);
    this.totalNutrientsSubject.next({
      totalProtein: 0,
      totalFat: 0,
      totalCarbohydrates: 0,
      totalCalories: 0
    });
    this.diagramDataSubject.next(null);
  }
}