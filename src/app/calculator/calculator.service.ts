import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  bmr: number = 0;
  caloricNeeds: number = 0;
  caloriesGoal: number | null = null;
  dietGoalMessage: string = '';

  constructor() { }

  calculateCaloricNeeds(weight: number, height: number, age: number, gender: string, activityLevel: string, dietGoal: string) {
    this.bmr = this.calculateBMR(weight, height, age, gender);
    const activityLevels: {
      [key: string]: number;
    } = {
      'ver-low': 1.25,
      'low': 1.5,
      'medium': 1.7,
      'high': 1.9,
      'very-high': 2.1
    };
    this.caloricNeeds = Math.floor(this.bmr * activityLevels[activityLevel]);
    this.caloriesGoal = this.dietGoal(this.caloricNeeds, dietGoal) || 0;
  }

  private calculateBMR(weight: number, height: number, age: number, gender: string) {
    let bmr: number;
    if (gender === 'male') {
      bmr = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    } else {
      bmr = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
    }
    return Math.floor(bmr);
  }

  private dietGoal(calories: number, goal: string): number {
    switch (goal) {
      case 'lose-weight':
        return Math.floor(calories * 0.8);
      case 'gain-weight':
        return Math.floor(calories * 1.2);
      case 'maintain-weight':
        return Math.floor(calories);
      default:
        return 0;
    }
  }

  calculateMacroNutrients(caloriesGoal: number) {
    const carbohydratesCalories = Math.floor(caloriesGoal * 0.5); 
    const proteinCalories = Math.floor(caloriesGoal * 0.25); 
    const fatsCalories = Math.floor(caloriesGoal * 0.25); 
  
    const carbohydratesGrams = Math.floor(carbohydratesCalories / 4); 
    const proteinGrams = Math.floor(proteinCalories / 4); 
    const fatsGrams = Math.floor(fatsCalories / 9); 
  
    return {
      carbohydrates: {calories: carbohydratesCalories, grams: carbohydratesGrams},
      protein: {calories: proteinCalories, grams: proteinGrams},
      fats: {calories: fatsCalories, grams: fatsGrams}
    };
  }
}