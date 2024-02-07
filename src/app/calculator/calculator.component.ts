import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { 
  faMars,
  faVenus,
  faCalendarDays,
  faWeightHanging,
  faArrowsUpDown,
  faPersonRunning,
  faDumbbell }
from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


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
  form!: FormGroup;

  constructor(private fb: FormBuilder,
     private router: Router,
     private calculatorService: CalculatorService) {
  }
  
  ngOnInit() {
    this.form = this.fb.group({
      gender: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      activityLevel: ['', Validators.required],
      dietGoal: ['', Validators.required]
    });
  }

  onSubmit() {
    const weight = this.form.value.weight;
    const height = this.form.value.height;
    const age = this.form.value.age;
    const gender = this.form.value.gender;
    const activityLevel = this.form.value.activityLevel;
    const bmr = this.calculatorService.calculateBMR(weight, height, age, gender)
    const caloricNeeds = this.calculatorService.calculateCaloricNeeds(weight, height, age, gender, activityLevel);
    console.log(caloricNeeds, bmr);
    this.router.navigate(['result']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  onReturn() {
    this.router.navigate(['']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
