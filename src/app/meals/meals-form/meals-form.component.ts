import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFire, faUtensils, faCubesStacked } from '@fortawesome/free-solid-svg-icons';
import { MealsService } from '../meals.service';


@Component({
  selector: 'app-meals-form',
  templateUrl: './meals-form.component.html',
  styleUrls: ['./meals-form.component.scss']
})
export class MealsFormComponent implements OnInit {
  form!: FormGroup;
  faFire = faFire;
  faUtensils = faUtensils;
  faCubesStacked = faCubesStacked;
  loading: boolean = false;

  caloriesOptions = [
    { value: "small", label: "poniżej 300kcal" },
    { value: "medium", label: "300kcal - 700kcal" },
    { value: "large", label: "powyżej 700kcal" }
  ];
  
  kindOptions = [
    { value: "snacks", label: "Przekąski" },
    { value: "dinners", label: "Obiady" },
    { value: "breakfasts", label: "Śniadania" },
    { value: "fruits-vegetables", label: "Owoce/Warzywa" }
  ];
  
  tasteOptions = [
    { value: "sweet", label: "Na słodko" },
    { value: "salty", label: "Na słono" }
  ];
  
  constructor(private fb: FormBuilder,
    private mealsService: MealsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      calories: ['', Validators.required],
      kind: ['', Validators.required],
      taste: ['', Validators.required]
    });
    this.mealsService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  onFilterClick() {
    const filterOptions = this.form.value;
    this.mealsService.filterMeals(filterOptions);
    this.mealsService.setLoading(true);
  }
}
