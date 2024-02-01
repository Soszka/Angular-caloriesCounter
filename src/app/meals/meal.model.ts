export class AddedMeal {
  public name: string;
  public calories: number
  public fats: number;
  public protein: number;
  public carbohydrates: number

  constructor(name: string, calories: number, fats: number, protein: number, carbohydrates: number) {
    this.name = name;
    this.calories = calories;
    this.fats = fats;
    this.protein = protein;
    this.carbohydrates = carbohydrates;
  }
}