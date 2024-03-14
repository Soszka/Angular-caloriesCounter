import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaloriesService } from '../calories.service';

@Component({
  selector: 'app-calories-diagram',
  templateUrl: './calories-diagram.component.html',
  styleUrl: './calories-diagram.component.scss'
})
export class CaloriesDiagramComponent implements OnInit, OnDestroy {
  diagramData: any;
  totalProtein: number = 0;
  totalFat: number = 0;
  totalCarbohydrates: number = 0;
  totalCalories: number = 0;
  remainingCalories: number = 0;
  exceededCalories: number = 0;
  caloriesMessage: string = ""
  proteinPercentage: number = 0;
  fatPercentage: number = 0;
  carbohydratesPercentage: number = 0;
  private diagramDataSubscription!: Subscription;
  private totalNutrientsSubscription!: Subscription;

  constructor(private caloriesService: CaloriesService) {}

  ngOnInit() {
    this.diagramDataSubscription = this.caloriesService.diagramData$.subscribe(data => {
      this.diagramData = data;
    });

    this.totalNutrientsSubscription = this.caloriesService.totalNutrients$.subscribe(nutrients => {
      this.totalProtein = nutrients.totalProtein;
      this.totalFat = nutrients.totalFat;
      this.totalCarbohydrates = nutrients.totalCarbohydrates;
      this.totalCalories = nutrients.totalCalories;
      this.calculateNutrientPercentages();
    });

    this.caloriesService.updateCaloriesMessage$.subscribe(() => {
      this.calculateRemainingCalories();
      this.updateCaloriesMessage();
    });

    this.calculateRemainingCalories();
    this.updateCaloriesMessage();
  }

  calculateRemainingCalories() {
    if (this.diagramData && this.diagramData.caloriesGoal) {
      const consumedCalories = this.totalCalories;
      const goalCalories = this.diagramData.caloriesGoal;
      this.remainingCalories = goalCalories - consumedCalories;
      this.exceededCalories = consumedCalories - goalCalories;
    }
  }

  updateCaloriesMessage() {
    if (this.remainingCalories > 0) {
      this.caloriesMessage = `Pozostało ${this.remainingCalories} kalorii`;
    } else if (this.exceededCalories > 0) {
      this.caloriesMessage = `Przekroczono o ${this.exceededCalories} kalorii`;
    } else {
      this.caloriesMessage = '';
    }
  }

  calculateNutrientPercentages() {
    const totalNutrients = this.totalProtein + this.totalFat + this.totalCarbohydrates;
    if (totalNutrients > 0) {
      this.proteinPercentage = (this.totalProtein / totalNutrients) * 100;
      this.fatPercentage = (this.totalFat / totalNutrients) * 100;
      this.carbohydratesPercentage = (this.totalCarbohydrates / totalNutrients) * 100;
    } else {
      this.proteinPercentage = 0;
      this.fatPercentage = 0;
      this.carbohydratesPercentage = 0;
    }
  }

  ngOnDestroy() {
    if (this.diagramDataSubscription) {
      this.diagramDataSubscription.unsubscribe();
    }
    if (this.totalNutrientsSubscription) {
      this.totalNutrientsSubscription.unsubscribe();
    }
  }
}