import { Component } from '@angular/core';
import { faAppleWhole, faPersonRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator-result',
  templateUrl: './calculator-result.component.html',
  styleUrl: './calculator-result.component.scss'
})
export class CalculatorResultComponent {
  sectionName = "REZULTAT";
  sectionDescription = "Sprawdź swój rezultat i zapisz swoje zapotrzebowanie kaloryczne";
  faAppleWhole = faAppleWhole;
  faPersonRunning = faPersonRunning;
  faDumbbell = faDumbbell;
  
  bmr: number = 0;
  caloricNeeds: number = 0;
  caloriesGoal: number | null = null;
  dietGoalMessage: string = '';
  macroNutrients: { carbohydrates: { calories: number; grams: number }; protein: { calories: number; grams: number }; fats: { calories: number; grams: number } } = { 
    carbohydrates: { calories: 0, grams: 0 },
    protein: { calories: 0, grams: 0 },
    fats: { calories: 0, grams: 0 }
  };

  constructor(private router: Router,
    private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.dietGoalMessage = this.calculatorService.dietGoalMessage;
    this.bmr = this.calculatorService.bmr;
    this.caloricNeeds = this.calculatorService.caloricNeeds;
    this.caloriesGoal = this.calculatorService.caloriesGoal || 0;
    this.macroNutrients = this.calculatorService.calculateMacroNutrients(this.caloriesGoal);
  }
  
  recalculate() {
    this.router.navigate(['calculator']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
