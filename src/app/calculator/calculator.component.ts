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
  sectionName = "KALKULATORA";
  sectionDescription = "Skorzystaj z ...";
  faMars = faMars;
  faVenus = faVenus;
  faCalendarDays = faCalendarDays;
  faWeightHanging = faWeightHanging;
  faArrowsUpDown = faArrowsUpDown;
  faPersonRunning = faPersonRunning;
  faDumbbell = faDumbbell;

  dataOptions = [
    { formControlName: 'age', placeholder: 'Wiek ( lat )', icon: faCalendarDays, validator: 'validateAge' },
    { formControlName: 'weight', placeholder: 'Waga ( kg )', icon: faWeightHanging, validator: 'validateBodyInputs' },
    { formControlName: 'height', placeholder: 'Wzrost ( cm )', icon: faArrowsUpDown, validator: 'validateBodyInputs' }
  ];
  genderOptions = [
    { value: 'male', icon: this.faMars, label: 'Mężczyzna' },
    { value: 'female', icon: this.faVenus, label: 'Kobieta' }
  ];
  activityLevelOptions = [
    { value: 'ver-low', label: 'Bardzo niska aktywność (minimalny wysiłek fizyczny)' },
    { value: 'low', label: 'Niska aktywność (1-2 treningi/tydzień)' },
    { value: 'medium', label: 'Średnia aktywność (3-4 treningi/tydzień)' },
    { value: 'high', label: 'Wysoka aktywność (5-6 treningi/tydzień)' },
    { value: 'very-high', label: 'Bardzo wysoka aktywność ( codzienne treningi )' }
  ];
  dietGoalOptions = [
    { value: 'lose-weight', label: 'Chcę schudnąć' },
    { value: 'maintain-weight', label: 'Chcę utrzymać wagę' },
    { value: 'gain-weight', label: 'Chcę przytyć' }
  ];

  showMessage: boolean = false;
  messageInfo = "Uzupełnij wszystkie pola !";
  dietGoalMessage: string = '';
  form!: FormGroup;

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
      this.router.navigate(['/calculator/result']).then(() => {
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
