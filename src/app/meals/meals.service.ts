import { Injectable  } from '@angular/core'
import { BehaviorSubject, filter } from 'rxjs';;

export interface MealElement {
  id: number
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
  kind: string;
  taste: string
}

@Injectable()
export class MealsService {
  private elementDataSubject = new BehaviorSubject<MealElement[]>([]);
  elementData$ = this.elementDataSubject.asObservable();

  private selectedElementSubject = new BehaviorSubject<MealElement | null>(null);
  selectedElement$ = this.selectedElementSubject.asObservable();
  
  private elementsData: MealElement[] = [
    { id: 1, name: 'Jogurt truskawkowy', calories: 192, carbohydrates: 24, protein: 12, fats: 6, kind: 'breakfasts', taste: 'sweet' },
    { id: 2, name: 'Sałatka cezar', calories: 700, carbohydrates: 20, protein: 35, fats: 55, kind: 'dinners', taste: 'salty' },
    { id: 3, name: 'Koktajl bananowy', calories: 360, carbohydrates: 60, protein: 8, fats: 9, kind: 'breakfasts', taste: 'sweet' },
    { id: 4, name: 'Kurczak curry', calories: 1080, carbohydrates: 45, protein: 50, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 5, name: 'Jajecznica z warzywami', calories: 480, carbohydrates: 10, protein: 25, fats: 36, kind: 'breakfasts', taste: 'salty' },
    { id: 6, name: 'Muffiny jagodowe', calories: 270, carbohydrates: 40, protein: 5, fats: 10, kind: 'snacks', taste: 'sweet' },
    { id: 7, name: 'Ryba z ziołami', calories: 820, carbohydrates: 15, protein: 40, fats: 65, kind: 'dinners', taste: 'salty' },
    { id: 8, name: 'Owsianka z owocami', calories: 260, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 9, name: 'Kanapki z łososiem', calories: 520, carbohydrates: 30, protein: 20, fats: 35, kind: 'snacks', taste: 'salty' },
    { id: 10, name: 'Koktajl malinowy', calories: 320, carbohydrates: 50, protein: 9, fats: 6, kind: 'breakfasts', taste: 'sweet' },
    { id: 11, name: 'Sałatka grecka', calories: 620, carbohydrates: 20, protein: 15, fats: 50, kind: 'dinners', taste: 'salty' },
    { id: 12, name: 'Omelet z pieczarkami', calories: 450, carbohydrates: 5, protein: 20, fats: 35, kind: 'breakfasts', taste: 'salty' },
    { id: 13, name: 'Tosty z awokado', calories: 390, carbohydrates: 30, protein: 10, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 14, name: 'Koktajl mango', calories: 280, carbohydrates: 40, protein: 8, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 15, name: 'Pierogi z mięsem', calories: 780, carbohydrates: 50, protein: 30, fats: 40, kind: 'dinners', taste: 'salty' },
    { id: 16, name: 'Jogurt naturalny', calories: 180, carbohydrates: 15, protein: 10, fats: 8, kind: 'snacks', taste: 'sweet' },
    { id: 17, name: 'Jajka na twardo', calories: 240, carbohydrates: 2, protein: 20, fats: 18, kind: 'breakfasts', taste: 'salty' },
    { id: 18, name: 'Koktajl arbuzowy', calories: 220, carbohydrates: 40, protein: 5, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 19, name: 'Kurczak duszony', calories: 970, carbohydrates: 30, protein: 45, fats: 40, kind: 'dinners', taste: 'salty' },
    { id: 20, name: 'Omlet z szynką', calories: 400, carbohydrates: 8, protein: 25, fats: 30, kind: 'breakfasts', taste: 'salty' },
    { id: 21, name: 'Koktajl truskawkowy', calories: 310, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 22, name: 'Kasza z warzywami', calories: 580, carbohydrates: 50, protein: 12, fats: 15, kind: 'dinners', taste: 'salty' },
    { id: 23, name: 'Jogurt malinowy', calories: 210, carbohydrates: 20, protein: 12, fats: 8, kind: 'snacks', taste: 'sweet' },
    { id: 24, name: 'Chleb z serem', calories: 360, carbohydrates: 30, protein: 15, fats: 15, kind: 'snacks', taste: 'salty' },
    { id: 25, name: 'Koktajl brzoskwiniowy', calories: 280, carbohydrates: 35, protein: 8, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 26, name: 'Pieczone ziemniaki', calories: 500, carbohydrates: 40, protein: 5, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 27, name: 'Musli z owocami', calories: 230, carbohydrates: 35, protein: 6, fats: 5, kind: 'snacks', taste: 'sweet' },
    { id: 28, name: 'Sałatka z tuńczykiem', calories: 640, carbohydrates: 15, protein: 25, fats: 50, kind: 'dinners', taste: 'salty' },
    { id: 29, name: 'Koktajl jabłkowy', calories: 270, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 30, name: 'Pasta z ciecierzycy', calories: 320, carbohydrates: 30, protein: 15, fats: 12, kind: 'snacks', taste: 'salty' },
    { id: 31, name: 'Omelet z serem', calories: 425, carbohydrates: 5, protein: 22, fats: 35, kind: 'breakfasts', taste: 'salty' },
    { id: 32, name: 'Sałatka z rukolą', calories: 300, carbohydrates: 10, protein: 5, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 33, name: 'Placki ziemniaczane', calories: 500, carbohydrates: 40, protein: 10, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 34, name: 'Tosty z pomidorem', calories: 380, carbohydrates: 25, protein: 10, fats: 20, kind: 'snacks', taste: 'salty' },
    { id: 35, name: 'Smoothie malinowe', calories: 250, carbohydrates: 35, protein: 5, fats: 8, kind: 'breakfasts', taste: 'sweet' },
    { id: 36, name: 'Zupa pomidorowa', calories: 420, carbohydrates: 20, protein: 10, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 37, name: 'Naleśniki z dżemem', calories: 350, carbohydrates: 45, protein: 5, fats: 15, kind: 'breakfasts', taste: 'sweet' },
    { id: 38, name: 'Sałatka z brokułami', calories: 300, carbohydrates: 15, protein: 10, fats: 20, kind: 'snacks', taste: 'salty' },
    { id: 39, name: 'Kanapki z pastą jajeczną', calories: 450, carbohydrates: 30, protein: 15, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 40, name: 'Koktajl kiwi', calories: 280, carbohydrates: 40, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 41, name: 'Pierogi ruskie', calories: 550, carbohydrates: 35, protein: 20, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 42, name: 'Tosty z jajkiem', calories: 400, carbohydrates: 20, protein: 15, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 43, name: 'Koktajl śliwkowy', calories: 320, carbohydrates: 35, protein: 7, fats: 6, kind: 'breakfasts', taste: 'sweet' },
    { id: 44, name: 'Ziemniaki pieczone', calories: 460, carbohydrates: 30, protein: 5, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 45, name: 'Tarta z owocami', calories: 280, carbohydrates: 40, protein: 5, fats: 12, kind: 'snacks', taste: 'sweet' },
    { id: 46, name: 'Kurczak pieczony', calories: 680, carbohydrates: 25, protein: 40, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 47, name: 'Koktajl mandarynkowy', calories: 300, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 48, name: 'Sałatka z selera', calories: 240, carbohydrates: 15, protein: 10, fats: 18, kind: 'snacks', taste: 'salty' },
    { id: 49, name: 'Kanapki z avocado', calories: 420, carbohydrates: 25, protein: 10, fats: 30, kind: 'snacks', taste: 'salty' },
    { id: 50, name: 'Koktajl jagodowy', calories: 340, carbohydrates: 45, protein: 8, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 51, name: 'Ryż z warzywami', calories: 530, carbohydrates: 40, protein: 12, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 52, name: 'Omlet z brokułami', calories: 360, carbohydrates: 5, protein: 20, fats: 30, kind: 'breakfasts', taste: 'salty' },
    { id: 53, name: 'Tosty z łososiem', calories: 480, carbohydrates: 20, protein: 25, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 54, name: 'Koktajl malinowo-bananowy', calories: 410, carbohydrates: 50, protein: 9, fats: 8, kind: 'breakfasts', taste: 'sweet' },
    { id: 55, name: 'Sałatka z pomidorem', calories: 320, carbohydrates: 15, protein: 5, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 56, name: 'Pasta z makreli', calories: 370, carbohydrates: 15, protein: 20, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 57, name: 'Koktajl truskawkowo-bananowy', calories: 350, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 58, name: 'Zupa krem z dyni', calories: 280, carbohydrates: 30, protein: 5, fats: 15, kind: 'dinners', taste: 'salty' },
    { id: 59, name: 'Tosty z hummusem', calories: 310, carbohydrates: 25, protein: 10, fats: 18, kind: 'snacks', taste: 'salty' },
    { id: 60, name: 'Koktajl grejpfrutowy', calories: 290, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 61, name: 'Kurczak duszony', calories: 920, carbohydrates: 30, protein: 45, fats: 35, kind: 'dinners', taste: 'salty' },
    { id: 62, name: 'Tarta z malinami', calories: 260, carbohydrates: 40, protein: 5, fats: 8, kind: 'snacks', taste: 'sweet' },
    { id: 63, name: 'Koktajl z awokado', calories: 330, carbohydrates: 20, protein: 10, fats: 25, kind: 'breakfasts', taste: 'sweet' },
    { id: 64, name: 'Zapiekanka ziemniaczana', calories: 500, carbohydrates: 30, protein: 15, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 65, name: 'Sałatka z krewetkami', calories: 360, carbohydrates: 15, protein: 20, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 66, name: 'Naleśniki z serem', calories: 420, carbohydrates: 35, protein: 10, fats: 25, kind: 'snacks', taste: 'sweet' },
    { id: 67, name: 'Koktajl cytrynowo-miodowy', calories: 280, carbohydrates: 40, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 68, name: 'Zupa cebulowa', calories: 340, carbohydrates: 25, protein: 5, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 69, name: 'Koktajl z mango', calories: 310, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 70, name: 'Kanapki z szynką', calories: 470, carbohydrates: 25, protein: 20, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 71, name: 'Sałatka z rukolą', calories: 280, carbohydrates: 15, protein: 10, fats: 20, kind: 'snacks', taste: 'salty' },
    { id: 72, name: 'Koktajl borówkowy', calories: 330, carbohydrates: 40, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 73, name: 'Ryba smażona', calories: 550, carbohydrates: 30, protein: 25, fats: 35, kind: 'dinners', taste: 'salty' },
    { id: 74, name: 'Placki ziemniaczane', calories: 480, carbohydrates: 40, protein: 10, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 75, name: 'Koktajl z granatem', calories: 310, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 76, name: 'Kurczak pieczony', calories: 670, carbohydrates: 25, protein: 40, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 77, name: 'Zupa krem z kalafiora', calories: 250, carbohydrates: 30, protein: 5, fats: 12, kind: 'snacks', taste: 'salty' },
    { id: 78, name: 'Tosty z pomidorem', calories: 360, carbohydrates: 25, protein: 10, fats: 20, kind: 'snacks', taste: 'salty' },
    { id: 79, name: 'Koktajl malinowo-bananowy', calories: 410, carbohydrates: 50, protein: 9, fats: 8, kind: 'breakfasts', taste: 'sweet' },
    { id: 80, name: 'Sałatka z selera', calories: 290, carbohydrates: 15, protein: 10, fats: 18, kind: 'snacks', taste: 'salty' },
    { id: 81, name: 'Kanapki z pastą jajeczną', calories: 450, carbohydrates: 30, protein: 15, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 82, name: 'Koktajl kiwi', calories: 290, carbohydrates: 40, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 83, name: 'Pierogi ruskie', calories: 550, carbohydrates: 35, protein: 20, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 84, name: 'Tosty z jajkiem', calories: 380, carbohydrates: 20, protein: 15, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 85, name: 'Koktajl śliwkowy', calories: 310, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 86, name: 'Ziemniaki pieczone', calories: 460, carbohydrates: 30, protein: 5, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 87, name: 'Tarta z owocami', calories: 290, carbohydrates: 40, protein: 5, fats: 12, kind: 'snacks', taste: 'sweet' },
    { id: 88, name: 'Kurczak pieczony', calories: 650, carbohydrates: 25, protein: 40, fats: 40, kind: 'dinners', taste: 'salty' },
    { id: 89, name: 'Koktajl mandarynkowy', calories: 300, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 90, name: 'Sałatka z krewetkami', calories: 360, carbohydrates: 15, protein: 20, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 91, name: 'Naleśniki z serem', calories: 420, carbohydrates: 35, protein: 10, fats: 25, kind: 'snacks', taste: 'sweet' },
    { id: 92, name: 'Koktajl cytrynowo-miodowy', calories: 280, carbohydrates: 40, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 93, name: 'Zupa cebulowa', calories: 340, carbohydrates: 25, protein: 5, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 94, name: 'Koktajl z mango', calories: 310, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 95, name: 'Kanapki z szynką', calories: 470, carbohydrates: 25, protein: 20, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 96, name: 'Sałatka z rukolą', calories: 280, carbohydrates: 15, protein: 10, fats: 20, kind: 'snacks', taste: 'salty' },
    { id: 97, name: 'Koktajl borówkowy', calories: 330, carbohydrates: 40, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 98, name: 'Ryba smażona', calories: 550, carbohydrates: 30, protein: 25, fats: 35, kind: 'dinners', taste: 'salty' },
    { id: 99, name: 'Placki ziemniaczane', calories: 480, carbohydrates: 40, protein: 10, fats: 25, kind: 'snacks', taste: 'salty' },
    { id: 100, name: 'Koktajl z granatem', calories: 310, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet' },
  ];

  constructor() {
    this.updateElementData(this.elementsData);
  }

  updateElementData(data: MealElement[]) {
    this.elementDataSubject.next(data);
  }

  setSelectedElement(element: MealElement) {
    this.selectedElementSubject.next(element);
  }

  filterMeals(filterOptions: any) {
    const mealElements: MealElement[] = this.elementsData;
    console.log(filterOptions);
    const filteredElements = mealElements.filter(element => {
      const caloriesCondition =
        (filterOptions.calories === "small" && element.calories < 500) ||
        (filterOptions.calories === "medium" && element.calories >= 500 && element.calories <= 1000) ||
        (filterOptions.calories === "large" && element.calories > 1000) ||
        !filterOptions.calories; 
      const kindCondition = !filterOptions.kind || element.kind === filterOptions.kind;
      const tasteCondition = !filterOptions.taste || element.taste === filterOptions.taste;

      return caloriesCondition && kindCondition && tasteCondition;
    });

    console.log(filteredElements);
    this.elementDataSubject.next(filteredElements);
  }
}