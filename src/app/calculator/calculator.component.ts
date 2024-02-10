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
  showMessage: boolean = false;
  messageInfo = "Uzupełnij wszystkie pola !";
  form!: FormGroup;
  dietGoalMessage: string = '';

  constructor(private fb: FormBuilder,
     private router: Router,
     private calculatorService: CalculatorService) {
  }
  
  ngOnInit() {
    this.form = this.fb.group({
      gender: ['male', Validators.required],
      age: ['', [Validators.required, Validators.max(120)]],
      weight: ['', [Validators.required, Validators.max(250)]],
      height: ['', [Validators.required, Validators.max(250)]],
      activityLevel: ['', Validators.required],
      dietGoal: ['', Validators.required]
    });
  }

  validateAge(controlName: string) {
    const control = this.form.get(controlName);
    if (control) {
      let value = control.value;
      if (value < 0 || value > 120 || isNaN(value)) {
        control.setValue(120);
      }
    }
  }

  validateBodyInputs(controlName: string) {
    const control = this.form.get(controlName);
    if (control) {
      let value = control.value;
      if (value < 0 || value > 250 || isNaN(value)) {
        control.setValue(250);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const { weight, height, age, gender, activityLevel, dietGoal } = this.form.value;
      this.calculatorService.calculateCaloricNeeds(weight, height, age, gender, activityLevel, dietGoal);
      this.dietGoalMessage = this.getDietGoalMessage(this.form.value.dietGoal);
      this.calculatorService.dietGoalMessage = this.dietGoalMessage;
      this.router.navigate(['result']).then(() => {
        window.scrollTo(0, 0);
      });
    } else {
      this.showMessage = true;
    }
  }

  private getDietGoalMessage(goal: string): string {
    switch (goal) {
      case 'lose-weight':
        return 'Jeśli chcesz zmniejszyć wagę, powinieneś spożywać około:';
      case 'gain-weight':
        return 'Jeśli chcesz zwiększyć wagę, powinieneś spożywać około:';
      case 'maintain-weight':
        return 'Jeśli chcesz utrzymać wagę, powinieneś spożywać około:';
      default:
        return '';
    }
  }

  onOkClick() {
    this.showMessage = false;
  }

  onReturn() {
    this.router.navigate(['']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
