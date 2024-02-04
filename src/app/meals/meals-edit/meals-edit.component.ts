import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFire, faUtensils, faBurger, faBreadSlice, faDrumstickBite  } from '@fortawesome/free-solid-svg-icons';
import { MealElement, MealsService } from '../meals.service';
import { Router } from '@angular/router';
import { CaloriesService } from '../../calories/calories.service';
import { AddedMeal } from '../meal.model';

@Component({
  selector: 'app-meals-edit',
  templateUrl: './meals-edit.component.html',
  styleUrl: './meals-edit.component.scss'
})
export class MealsEditComponent {
  faFire = faFire;
  faUtensils = faUtensils;
  faBurger = faBurger;
  faBreadSlice = faBreadSlice;
  faDrumstickBite = faDrumstickBite;
  sectionName = "EDYCJA";
  sectionDescription = "Edytuj wybrany produkt i dodaj go do swojej listy !";

  selectedElement: MealElement | null = null;
  mealForm: FormGroup;

  constructor(private mealsService: MealsService,
     private router: Router, private fb: FormBuilder,
     private caloriesService: CaloriesService) {
    this.mealForm = this.fb.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      protein: ['', Validators.required],
      fats: ['', Validators.required],
      carbohydrates: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.mealsService.selectedElement$.subscribe(element => {
      this.selectedElement = element;
      if (this.mealForm && this.selectedElement) {
        this.mealForm.setValue({
          name: this.selectedElement.name,
          calories: this.selectedElement.calories,
          protein: this.selectedElement.protein,
          fats: this.selectedElement.fats,
          carbohydrates: this.selectedElement.carbohydrates,
        });
      }
      this.mealForm.get('calories')?.disable();
    });
  }

  updateCalories() {
    const protein = this.mealForm.value.protein;
    const fats = this.mealForm.value.fats;
    const carbohydrates = this.mealForm.value.carbohydrates;
    const calories = protein * 4 + fats * 9 + carbohydrates * 4;
    this.mealForm.setValue({
      ...this.mealForm.value, 
      calories: calories,
    });
  }

  onSaveClick() {
    if (this.mealForm.valid) {
      const addedMeal = new AddedMeal(
        this.mealForm.value.name,
        this.mealForm.value.calories,
        this.mealForm.value.fats,
        this.mealForm.value.protein,
        this.mealForm.value.carbohydrates
      );
      this.caloriesService.addElement(addedMeal);
      this.router.navigate(['meals']);
    }
  }

  onCancelCLick() {
    this.router.navigate(['meals']);
  }
}
