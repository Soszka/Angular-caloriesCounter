import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  faMars,
  faVenus,
  faCalendarDays,
  faWeightHanging,
  faArrowsUpDown,
  faPersonRunning,
  faDumbbell }
from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  sectionName = "KALKULATOR";
  sectionDescription = "Wprowadź swoje dane i oblicz zapotrzebowanie kaloryczne";
  faMars = faMars;
  faVenus = faVenus;
  faCalendarDays = faCalendarDays;
  faWeightHanging = faWeightHanging;
  faArrowsUpDown = faArrowsUpDown;
  faPersonRunning = faPersonRunning;
  faDumbbell = faDumbbell;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      gender: ['male', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required]
    });
  }
}
