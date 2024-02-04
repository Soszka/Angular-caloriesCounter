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

  constructor(private fb: FormBuilder,
    private mealsService: MealsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      calories: ['', Validators.required],
      kind: ['', Validators.required],
      taste: ['', Validators.required]
    });
  }

  onFilterClick() {
    const filterOptions = this.form.value;
    this.mealsService.filterMeals(filterOptions);
  }
}
