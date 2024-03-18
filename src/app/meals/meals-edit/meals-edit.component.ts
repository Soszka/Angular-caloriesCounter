import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFire, faUtensils, faBurger, faBreadSlice, faDrumstickBite, faCubesStacked  } from '@fortawesome/free-solid-svg-icons';
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
  faCubesStacked = faCubesStacked;
  faFire = faFire;
  faUtensils = faUtensils;
  faBurger = faBurger;
  faBreadSlice = faBreadSlice;
  faDrumstickBite = faDrumstickBite;

  sectionName!: string
  sectionDescription!: string;
  selectedElement: MealElement | null = null;
  mealForm: FormGroup;
  showMessage: boolean = false;
  shouldNavigate: boolean = false;
  editMode!: 'edit' | 'add';
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
        kind: ['', Validators.required],
        taste: ['', Validators.required],
        protein: ['', [Validators.required]],
        fats: ['', [Validators.required,]],
        carbohydrates: ['', [Validators.required,]],
     });
  }
  
  ngOnInit() {
    this.subscribeToEditMode();
    this.subscribeToSelectedElement();
  }

  subscribeToEditMode() {
    this.mealsService.editMode$.subscribe(mode => {
      this.editMode = mode;
      if (mode === 'edit') {
        this.sectionName = "EDYCJA";
        this.sectionDescription = "Edytuj wybrany produkt i zapisz go do swojej liście produktów!";
      } else {
        this.sectionName = "DODAWANIE PRODUKTU";
        this.sectionDescription = "Wprowadź nowy produkt i dodaj go do swojej listy produktów !";
      }
    });
  }

  subscribeToSelectedElement() {
    this.mealsService.selectedElement$.subscribe(element => {
      this.selectedElement = element;
      if (this.mealForm && element) {
        this.mealForm.setValue({
          name: element.name,
          calories: element.calories,
          protein: element.protein,
          fats: element.fats,
          carbohydrates: element.carbohydrates,
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
      this.messageInfo = "Pomyślnie dodano produkt ! Możesz go teraz zobaczyć w zakładce KALORIE"
      this.showMessage = true;
      this.shouldNavigate = true;
    } else {
      this.messageInfo = "Uzepłnij wszystkie pola żeby dodać produkt !"
      this.showMessage = true;
      this.shouldNavigate = false;
    }
  }

  onAddClick() {

  }

  onCaloriesClick() {
    this.messageInfo = "Nie można zmieniać ilości kalorii. Jest ona zależna od ilości tłuszczy, białka i węglowodanów";
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
