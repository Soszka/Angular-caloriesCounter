import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFire, faUtensils, faBurger, faBreadSlice, faDrumstickBite, faCubesStacked  } from '@fortawesome/free-solid-svg-icons';
import { MealElement, MealsService } from '../meals.service';
import { Router } from '@angular/router';

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
  editMode!: boolean;
  messageInfo = "";

  dataMacroOptions = [
    { label: 'Białko ( gram )', name: 'Białko', icon: faDrumstickBite, formControlName: 'protein' },
    { label: 'Tłuszcze ( gram )', name: 'Tłuszcze', icon: faBurger, formControlName: 'fats' },
    { label: 'Węglowodany ( gram )', name: 'Węglowodany', icon: faBreadSlice, formControlName: 'carbohydrates' }
  ];
  
  constructor(private mealsService: MealsService,
    private router: Router,
    private fb: FormBuilder) {
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
    this.mealsService.selectedElement$.subscribe(selectedMeal => {
      this.selectedElement = selectedMeal;
      if (selectedMeal) {
        this.setupFormForEdit(selectedMeal);
      } else {
        this.setupFormForAdd();
      }
    });
  }
  
  setupFormForEdit(element: MealElement) {
    this.sectionName = "EDYCJA";
    this.sectionDescription = "Edytuj wybrany produkt i zapisz w liście wszystkich produktów!";
    this.editMode = true;
    if (this.mealForm) {
      this.mealForm.setValue({
        name: element.name,
        calories: element.calories,
        kind: element.kind,
        taste: element.taste,
        protein: element.protein,
        fats: element.fats,
        carbohydrates: element.carbohydrates,
      });
    }
  }

  setupFormForAdd() {
    this.sectionName = "DODAWANIE PRODUKTU";
    this.sectionDescription = "Dodaj nowy produkt do listy wszystkich produktów!";
    this.editMode = false;
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
      const mealData = this.mealForm.value;
      if (this.editMode && this.selectedElement) {
        const updatedMeal: MealElement = { ...mealData, name: this.selectedElement.name };
        this.mealsService.updateMeal(updatedMeal).subscribe(() => {
          this.messageInfo = "Pomyślnie zapisano zmiany w wybranym produkcie!";
          this.shouldNavigate = true;
          this.showMessage = true;
        });
      } else {
        this.mealsService.elementData$.subscribe(meals => {
          const existingMeal = meals.find(meal => meal.name.toLowerCase() === mealData.name.toLowerCase());
          if (existingMeal) {
            this.mealForm.controls['name'].setValue('');
            this.messageInfo = "Produkt o tej nazwie już istnieje! Wprowadź nazwę ponownie.";
            this.showMessage = true;
          } else {
            this.mealsService.addMeal(mealData).subscribe(() => {
              this.messageInfo = "Pomyślnie dodano nowy posiłek do listy produktów!";
              this.shouldNavigate = true;
              this.showMessage = true;
            });
          }
        });
      }
    } else {
      this.messageInfo = "Proszę wypełnić wszystkie wymagane pola formularza.";
      this.showMessage = true;
    }
  }

  onNameClick() {
    if (this.editMode) {
      this.messageInfo = "Nie można zmienić nazwy produktu podczas jego edycji !";
      this.showMessage = true;
      this.shouldNavigate = false; 
    }
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
