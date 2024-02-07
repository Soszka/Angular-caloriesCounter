import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  calculateCaloricNeeds(weight: number, height: number, age: number, gender: string, activityLevel: string, dietGoal: string) {
    const bmr = this.calculateBMR(weight, height, age, gender);
    const activityLevels: {
      [key: string]: number;
    } = {
      'ver-low': 1.2,
      'low': 1.4,
      'medium': 1.6,
      'high': 1.8,
      'very-high': 2
    };
    const caloricNeeds = bmr * activityLevels[activityLevel];
    const caloriesGoal = this.dietGoal(caloricNeeds, dietGoal);
    return {
      bmr: bmr,
      caloricNeeds: caloricNeeds,
      caloriesGoal: caloriesGoal
    };
  }

  private calculateBMR(weight: number, height: number, age: number, gender: string) {
    let bmr: number;
    if (gender === 'male') {
      bmr = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    } else {
      bmr = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
    }
    return bmr;
  }

  private dietGoal(calories: number, goal: string) {
    switch (goal) {
      case 'lose-weight':
        return calories * 0.8;
      case 'gain-weight':
        return calories * 1.2;
      case 'maintain-weight':
        return calories;
      default:
        return null;
    }
  }
}