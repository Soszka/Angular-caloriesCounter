import { Component } from '@angular/core';
import { faAppleWhole, faPersonRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CalculatorService } from '../calculator.service';
import { CaloriesService  } from '../../calories/calories.service';

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
  showMessage: boolean = false;
  messageInfo = `Zapisano otrzymany rezultat! Możesz go teraz śledzić w zakładce KALORIE.
  Zostaniesz przekierowany do zakładki ŻYWNOŚĆ aby dodać produkty`

  resultData: { title: string; icon: any; calories: number | null }[] = [];
  resultDiagrams: {
    title: string,
    percentage: number,
    grams: number;
    calories: number,
    class: string
  }[] = [];
  macroNutrients: { 
    carbohydrates: { calories: number, grams: number },
    protein: { calories: number, grams: number },
    fats: { calories: number, grams: number }
  } = { 
    carbohydrates: { calories: 0, grams: 0 },
    protein: { calories: 0, grams: 0 },
    fats: { calories: 0, grams: 0 }
  };

  constructor(private router: Router,
    private calculatorService: CalculatorService,
    private caloriesService: CaloriesService) {}

  ngOnInit(): void {
    this.dietGoalMessage = this.calculatorService.dietGoalMessage;
    this.bmr = this.calculatorService.bmr;
    this.caloricNeeds = this.calculatorService.caloricNeeds;
    this.caloriesGoal = this.calculatorService.caloriesGoal || 0;
    this.macroNutrients = this.calculatorService.calculateMacroNutrients(this.caloriesGoal);

    this.resultData = [
      { 
        title: 'Twój wskaźnik BMR to :',
        icon: this.faAppleWhole, 
        calories: this.bmr
      },
      { 
        title: 'Twoje zapotrzebowanie kaloryczne to :',
        icon: this.faPersonRunning, 
        calories: this.caloricNeeds 
      },
      { 
        title: this.dietGoalMessage, 
        icon: this.faDumbbell, 
        calories: this.caloriesGoal 
      }
    ];
    this.resultDiagrams = [
      { 
        title: 'WĘGLOWODANY',
        percentage: 50,
        grams: this.macroNutrients.carbohydrates.grams,
        calories: this.macroNutrients.carbohydrates.calories,
        class: 'carbohydrates' 
      },
      { 
        title: 'BIAŁKO',
        percentage: 25, 
        grams: this.macroNutrients.protein.grams, 
        calories: this.macroNutrients.protein.calories, 
        class: 'protein' 
      }, 
      { 
        title: 'TŁUSZCZE', 
        percentage: 25, 
        grams: this.macroNutrients.fats.grams, 
        calories: this.macroNutrients.fats.calories, 
        class: 'fats' 
      }
    ];
  }

  onSave() {
    const dataToSave = {
      caloriesGoal: this.caloriesGoal,
      carbohydrates: this.macroNutrients.carbohydrates.grams,
      protein: this.macroNutrients.protein.grams,
      fats: this.macroNutrients.fats.grams
    };

    this.caloriesService.addDiagramData(dataToSave);
    this.showMessage = true;
  }

  onOkClick() {
    this.showMessage = false;
    this.router.navigate(['meals']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  
  recalculate() {
    this.router.navigate(['calculator']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
