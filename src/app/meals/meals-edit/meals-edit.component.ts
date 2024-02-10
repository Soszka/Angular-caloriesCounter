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
  showMessage: boolean = false;
  shouldNavigate: boolean = false;
  messageInfo = "";

  dataMacroOptions = [
    { label: 'Białko ( gram )', name: 'Białko', icon: faDrumstickBite, formControlName: 'protein' },
    { label: 'Tłuszcze ( gram )', name: 'Tłuszcze', icon: faBurger, formControlName: 'fats' },
    { label: 'Węglowodany ( gram )', name: 'Węglowodany', icon: faBreadSlice, formControlName: 'carbohydrates' }
  ];
  
  constructor(private mealsService: MealsService,
    private router: Router,
    private fb: FormBuilder,
    private caloriesService: CaloriesService) {
      this.mealForm = this.fb.group({
        name: ['', [Validators.required,]],
        calories: ['', Validators.required],
        protein: ['', [Validators.required]],
        fats: ['', [Validators.required,]],
        carbohydrates: ['', [Validators.required,]],
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
    });

  }

  validateInput(controlName: string) {
    const control = this.mealForm.get(controlName);
    if (control) {
      let value = control.value;
      if (value < 0 || value > 1000 || isNaN(value)) {
        control.setValue(1000);
      }
    }
  }

  updateCalories() {
    const protein = this.mealForm.value.protein;
    const fats = this.mealForm.value.fats;
    const carbohydrates = this.mealForm.value.carbohydrates;
    const calories = protein * 4 + fats * 9 + carbohydrates * 4;
    this.mealForm.controls['calories'].setValue(calories);
  }

  onSaveClick() {
    if (this.mealForm.valid) {
      const caloriesControl = this.mealForm.get('calories');
      const calories = caloriesControl ? caloriesControl.value : 0;
      const addedMeal = new AddedMeal(
        this.mealForm.value.name,
        calories,
        this.mealForm.value.fats,
        this.mealForm.value.protein,
        this.mealForm.value.carbohydrates
      );
      this.caloriesService.addElement(addedMeal);
      this.messageInfo = "Pomyślnie dodano produkt ! Możesz go teraz zobaczyć w zakładce kalorie"
      this.showMessage = true;
      this.shouldNavigate = true;
    } else {
      this.messageInfo = "Uzepłnij wszystkie pola żeby dodać produkt !"
      this.showMessage = true;
      this.shouldNavigate = false;
    }
  }

  onCaloriesClick() {
    this.messageInfo = "Nie można zmieniać ilości kalorii. Jest ona zależna od tłuszczy, białka i węglowodanów";
    this.showMessage = true;
    this.shouldNavigate = false; 
  }
  
  onOkClick() {
    this.showMessage = false;
    if (this.shouldNavigate) {
      this.router.navigate(['meals']);
    }
  }

  onCancelCLick() {
    this.router.navigate(['meals']);
  }
}
