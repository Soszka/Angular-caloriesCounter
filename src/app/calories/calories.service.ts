import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddedMeal } from '../meals/meal.model';

@Injectable({
  providedIn: 'root'
})
export class CaloriesService {
  private addedElementsSubject = new BehaviorSubject<AddedMeal[]>([]);
  addedElements$ = this.addedElementsSubject.asObservable();

  addElement(element: AddedMeal) {
    const currentElements = this.addedElementsSubject.value;
    const updatedElements = [...currentElements, element];
    this.addedElementsSubject.next(updatedElements);
  }

  removeElement(element: AddedMeal) {
    const currentElements = this.addedElementsSubject.value;
    const index = currentElements.indexOf(element);

    if (index !== -1) {
      currentElements.splice(index, 1);
      this.addedElementsSubject.next(currentElements);
    }
  }
}