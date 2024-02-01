import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFire, faUtensils, faCubesStacked } from '@fortawesome/free-solid-svg-icons';


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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      caloriesAmount: ['', Validators.required],
      kind: ['', Validators.required],
      taste: ['', Validators.required]
    });
  }
}
