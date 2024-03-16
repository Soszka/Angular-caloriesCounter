import { Injectable  } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs';;

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

  loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();
  
  private elementsData: MealElement[] = [
    { id: 1, name: 'Jogurt naturalny', calories: 277, carbohydrates: 15, protein: 25, fats: 13, kind: 'dinners', taste: 'salty' },
    { id: 2, name: 'Owsianka z miodem', calories: 342, carbohydrates: 46, protein: 8, fats: 14, kind: 'snacks', taste: 'sweet' },
    { id: 3, name: 'Kanapka z szynką', calories: 353, carbohydrates: 15, protein: 26, fats: 21, kind: 'snacks', taste: 'sweet' },
    { id: 4, name: 'Sałatka owocowa', calories: 206, carbohydrates: 16, protein: 22, fats: 6, kind: 'snacks', taste: 'sweet' },
    { id: 5, name: 'Smoothie jagodowe', calories: 253, carbohydrates: 10, protein: 15, fats: 17, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 6, name: 'Tost z awokado', calories: 300, carbohydrates: 31, protein: 17, fats: 12, kind: 'dinners', taste: 'sweet' },
    { id: 7, name: 'Koktajl warzywny', calories: 272, carbohydrates: 13, protein: 28, fats: 12, kind: 'breakfasts', taste: 'salty' },
    { id: 8, name: 'Omlet z warzywami', calories: 347, carbohydrates: 25, protein: 10, fats: 23, kind: 'snacks', taste: 'sweet' },
    { id: 9, name: 'Musli z orzechami', calories: 448, carbohydrates: 58, protein: 9, fats: 20, kind: 'dinners', taste: 'salty' },
    { id: 10, name: 'Pasta rybna', calories: 330, carbohydrates: 14, protein: 28, fats: 18, kind: 'breakfasts', taste: 'sweet' },
    { id: 11, name: 'Wrap z kurczakiem', calories: 485, carbohydrates: 38, protein: 27, fats: 25, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 12, name: 'Placki ziemniaczane', calories: 501, carbohydrates: 43, protein: 26, fats: 25, kind: 'dinners', taste: 'sweet' },
    { id: 13, name: 'Pierogi z kaszą', calories: 160, carbohydrates: 7, protein: 6, fats: 12, kind: 'breakfasts', taste: 'salty' },
    { id: 14, name: 'Zupa krem z dyni', calories: 423, carbohydrates: 36, protein: 18, fats: 23, kind: 'dinners', taste: 'salty' },
    { id: 15, name: 'Ryż z warzywami', calories: 271, carbohydrates: 9, protein: 7, fats: 23, kind: 'dinners', taste: 'sweet' },
    { id: 16, name: 'Kurczak pieczony', calories: 390, carbohydrates: 28, protein: 29, fats: 18, kind: 'breakfasts', taste: 'salty' },
    { id: 17, name: 'Makaron z sosem pomidorowym', calories: 421, carbohydrates: 30, protein: 10, fats: 29, kind: 'snacks', taste: 'sweet' },
    { id: 18, name: 'Hummus z pieczywem', calories: 569, carbohydrates: 49, protein: 28, fats: 29, kind: 'snacks', taste: 'salty' },
    { id: 19, name: 'Koktajl proteinowy', calories: 241, carbohydrates: 18, protein: 22, fats: 9, kind: 'breakfasts', taste: 'sweet' },
    { id: 20, name: 'Pudding chia', calories: 233, carbohydrates: 17, protein: 30, fats: 5, kind: 'dinners', taste: 'sweet' },
    { id: 21, name: 'Ciastko owsiane', calories: 509, carbohydrates: 47, protein: 15, fats: 29, kind: 'snacks', taste: 'sweet' },
    { id: 22, name: 'Chipsy warzywne', calories: 291, carbohydrates: 5, protein: 25, fats: 19, kind: 'dinners', taste: 'sweet' },
    { id: 23, name: 'Batony energetyczne', calories: 378, carbohydrates: 23, protein: 22, fats: 22, kind: 'snacks', taste: 'sweet' },
    { id: 24, name: 'Krem czekoladowy', calories: 205, carbohydrates: 8, protein: 14, fats: 13, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 25, name: 'Sorbet owocowy', calories: 234, carbohydrates: 8, protein: 10, fats: 18, kind: 'dinners', taste: 'sweet' },
    { id: 26, name: 'Panini z mozarellą', calories: 359, carbohydrates: 38, protein: 9, fats: 19, kind: 'breakfasts', taste: 'salty' },
    { id: 27, name: 'Quiche z szpinakiem', calories: 489, carbohydrates: 55, protein: 11, fats: 25, kind: 'breakfasts', taste: 'salty' },
    { id: 28, name: 'Falafel w pita', calories: 270, carbohydrates: 16, protein: 20, fats: 14, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 29, name: 'Risotto z grzybami', calories: 315, carbohydrates: 40, protein: 5, fats: 15, kind: 'dinners', taste: 'salty' },
    { id: 30, name: 'Tofu z warzywami', calories: 341, carbohydrates: 47, protein: 27, fats: 5, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 31, name: 'Czekolada gorzka', calories: 304, carbohydrates: 31, protein: 9, fats: 16, kind: 'snacks', taste: 'sweet' },
    { id: 32, name: 'Lody waniliowe', calories: 309, carbohydrates: 56, protein: 10, fats: 5, kind: 'snacks', taste: 'sweet' },
    { id: 33, name: 'Sernik na zimno', calories: 191, carbohydrates: 26, protein: 6, fats: 7, kind: 'breakfasts', taste: 'salty' },
    { id: 34, name: 'Ciasto marchewkowe', calories: 464, carbohydrates: 37, protein: 25, fats: 24, kind: 'snacks', taste: 'salty' },
    { id: 35, name: 'Tiramisu', calories: 306, carbohydrates: 8, protein: 19, fats: 22, kind: 'breakfasts', taste: 'salty' },
    { id: 36, name: 'Kawa mrożona', calories: 336, carbohydrates: 16, protein: 14, fats: 24, kind: 'snacks', taste: 'sweet' },
    { id: 37, name: 'Herbata ziołowa', calories: 268, carbohydrates: 16, protein: 15, fats: 16, kind: 'snacks', taste: 'salty' },
    { id: 38, name: 'Naleśniki z dżemem', calories: 242, carbohydrates: 5, protein: 15, fats: 18, kind: 'breakfasts', taste: 'sweet' },
    { id: 39, name: 'Crostini z pomidorem', calories: 460, carbohydrates: 48, protein: 13, fats: 24, kind: 'snacks', taste: 'salty' },
    { id: 40, name: 'Bruschetta z bazylia', calories: 210, carbohydrates: 8, protein: 22, fats: 10, kind: 'dinners', taste: 'salty' },
    { id: 41, name: 'Gazpacho', calories: 301, carbohydrates: 26, protein: 29, fats: 9, kind: 'breakfasts', taste: 'salty' },
    { id: 42, name: 'Carpaccio z buraka', calories: 474, carbohydrates: 52, protein: 17, fats: 22, kind: 'breakfasts', taste: 'sweet' },
    { id: 43, name: 'Tatar z łososia', calories: 321, carbohydrates: 44, protein: 7, fats: 13, kind: 'dinners', taste: 'salty' },
    { id: 44, name: 'Paella', calories: 475, carbohydrates: 54, protein: 13, fats: 23, kind: 'dinners', taste: 'sweet' },
    { id: 45, name: 'Curry z ciecierzycy', calories: 363, carbohydrates: 43, protein: 23, fats: 11, kind: 'dinners', taste: 'salty' },
    { id: 46, name: 'Burger wegetariański', calories: 291, carbohydrates: 24, protein: 15, fats: 15, kind: 'breakfasts', taste: 'sweet' },
    { id: 47, name: 'Hot dog z indyka', calories: 267, carbohydrates: 5, protein: 10, fats: 23, kind: 'breakfasts', taste: 'salty' },
    { id: 48, name: 'Szaszłyki z owocami', calories: 137, carbohydrates: 17, protein: 6, fats: 5, kind: 'breakfasts', taste: 'sweet' },
    { id: 49, name: 'Krewetki z grilla', calories: 258, carbohydrates: 35, protein: 16, fats: 6, kind: 'snacks', taste: 'salty' },
    { id: 50, name: 'Stek z tuńczyka', calories: 332, carbohydrates: 39, protein: 17, fats: 12, kind: 'dinners', taste: 'sweet' },
    { id: 51, name: 'Zapiekanka warzywna', calories: 282, carbohydrates: 21, protein: 27, fats: 10, kind: 'snacks', taste: 'sweet' },
    { id: 52, name: 'Gnocchi z pesto', calories: 257, carbohydrates: 30, protein: 5, fats: 13, kind: 'snacks', taste: 'sweet' },
    { id: 53, name: 'Lasagne z mięsem', calories: 453, carbohydrates: 38, protein: 28, fats: 21, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 54, name: 'Pączki', calories: 569, carbohydrates: 53, protein: 24, fats: 29, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 55, name: 'Babka cytrynowa', calories: 487, carbohydrates: 54, protein: 7, fats: 27, kind: 'dinners', taste: 'sweet' },
    { id: 56, name: 'Muffiny z jagodami', calories: 245, carbohydrates: 17, protein: 15, fats: 13, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 57, name: 'Ciasto bananowe', calories: 377, carbohydrates: 40, protein: 25, fats: 13, kind: 'dinners', taste: 'salty' },
    { id: 58, name: 'Kanapki z pastą jajeczną', calories: 302, carbohydrates: 5, protein: 30, fats: 18, kind: 'snacks', taste: 'sweet' },
    { id: 59, name: 'Jajka faszerowane', calories: 576, carbohydrates: 54, protein: 27, fats: 28, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 60, name: 'Sushi', calories: 540, carbohydrates: 42, protein: 30, fats: 28, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 61, name: 'Tempura warzywna', calories: 283, carbohydrates: 7, protein: 12, fats: 23, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 62, name: 'Spring rolls', calories: 261, carbohydrates: 20, protein: 7, fats: 17, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 63, name: 'Dim sum', calories: 218, carbohydrates: 34, protein: 7, fats: 6, kind: 'breakfasts', taste: 'salty' },
    { id: 64, name: 'Tacos z mięsem', calories: 431, carbohydrates: 50, protein: 6, fats: 23, kind: 'breakfasts', taste: 'salty' },
    { id: 65, name: 'Quesadilla z serem', calories: 513, carbohydrates: 50, protein: 13, fats: 29, kind: 'dinners', taste: 'salty' },
    { id: 66, name: 'Nachos z guacamole', calories: 448, carbohydrates: 23, protein: 26, fats: 28, kind: 'snacks', taste: 'sweet' },
    { id: 67, name: 'Burrito z wołowiną', calories: 186, carbohydrates: 15, protein: 9, fats: 10, kind: 'breakfasts', taste: 'salty' },
    { id: 68, name: 'Chili con carne', calories: 286, carbohydrates: 22, protein: 27, fats: 10, kind: 'breakfasts', taste: 'salty' },
    { id: 69, name: 'Frittata', calories: 433, carbohydrates: 33, protein: 19, fats: 25, kind: 'dinners', taste: 'salty' },
    { id: 70, name: 'Shakshuka', calories: 433, carbohydrates: 46, protein: 24, fats: 17, kind: 'snacks', taste: 'salty' },
    { id: 71, name: 'Parfait jogurtowy', calories: 467, carbohydrates: 43, protein: 22, fats: 23, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 72, name: 'Granola', calories: 492, carbohydrates: 60, protein: 18, fats: 20, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 73, name: 'Smoothie bowl', calories: 513, carbohydrates: 37, protein: 26, fats: 29, kind: 'snacks', taste: 'sweet' },
    { id: 74, name: 'Croissant z masłem', calories: 383, carbohydrates: 25, protein: 19, fats: 23, kind: 'breakfasts', taste: 'salty' },
    { id: 75, name: 'Bagel z łososiem', calories: 328, carbohydrates: 21, protein: 7, fats: 24, kind: 'dinners', taste: 'sweet' },
    { id: 76, name: 'Salmon bagel', calories: 474, carbohydrates: 58, protein: 11, fats: 22, kind: 'breakfasts', taste: 'salty' },
    { id: 77, name: 'French toast', calories: 276, carbohydrates: 11, protein: 13, fats: 20, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 78, name: 'Pancakes', calories: 300, carbohydrates: 31, protein: 17, fats: 12, kind: 'breakfasts', taste: 'sweet' },
    { id: 79, name: 'Waffles', calories: 440, carbohydrates: 40, protein: 7, fats: 28, kind: 'snacks', taste: 'salty' },
    { id: 80, name: 'Scone z dżemem', calories: 433, carbohydrates: 23, protein: 20, fats: 29, kind: 'breakfasts', taste: 'sweet' },
    { id: 81, name: 'Macaron', calories: 368, carbohydrates: 11, protein: 18, fats: 28, kind: 'breakfasts', taste: 'sweet' },
    { id: 82, name: 'Éclair', calories: 454, carbohydrates: 40, protein: 24, fats: 22, kind: 'dinners', taste: 'salty' },
    { id: 83, name: 'Profiterole', calories: 351, carbohydrates: 48, protein: 24, fats: 7, kind: 'dinners', taste: 'salty' },
    { id: 84, name: 'Opera cake', calories: 414, carbohydrates: 46, protein: 17, fats: 18, kind: 'fruits-vegetables', taste: 'sweet' },
    { id: 85, name: 'Mille-feuille', calories: 466, carbohydrates: 42, protein: 16, fats: 26, kind: 'dinners', taste: 'salty' },
    { id: 86, name: 'Focaccia', calories: 262, carbohydrates: 5, protein: 29, fats: 14, kind: 'breakfasts', taste: 'salty' },
    { id: 87, name: 'Ciabatta', calories: 379, carbohydrates: 49, protein: 30, fats: 7, kind: 'fruits-vegetables', taste: 'salty' },
    { id: 88, name: 'Panettone', calories: 241, carbohydrates: 25, protein: 15, fats: 9, kind: 'snacks', taste: 'sweet' },
    { id: 89, name: 'Stollen', calories: 477, carbohydrates: 44, protein: 10, fats: 29, kind: 'dinners', taste: 'salty' },
    { id: 90, name: 'Biscotti', calories: 422, carbohydrates: 20, protein: 27, fats: 26, kind: 'dinners', taste: 'salty' },
    { id: 91, name: 'Tart tatin', calories: 385, carbohydrates: 58, protein: 27, fats: 5, kind: 'dinners', taste: 'salty' },
    { id: 92, name: 'Clafoutis', calories: 362, carbohydrates: 38, protein: 12, fats: 18, kind: 'breakfasts', taste: 'salty' },
    { id: 93, name: 'Pavlova', calories: 402, carbohydrates: 23, protein: 28, fats: 22, kind: 'snacks', taste: 'salty' },
    { id: 94, name: 'Mousse au chocolat', calories: 341, carbohydrates: 8, protein: 12, fats: 29, kind: 'snacks', taste: 'sweet' },
    { id: 95, name: 'Crème brûlée', calories: 218, carbohydrates: 9, protein: 14, fats: 14, kind: 'dinners', taste: 'sweet' },
    { id: 111, name: 'Czekoladowe brownie', calories: 750, carbohydrates: 95, protein: 8, fats: 42, kind: 'snacks', taste: 'sweet' },
    { id: 112, name: 'Lasagne warzywne', calories: 580, carbohydrates: 50, protein: 18, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 113, name: 'Sushi zestaw', calories: 510, carbohydrates: 85, protein: 25, fats: 10, kind: 'dinners', taste: 'salty' },
    { id: 114, name: 'Ramen z wołowiną', calories: 670, carbohydrates: 60, protein: 40, fats: 30, kind: 'dinners', taste: 'spicy' },
    { id: 115, name: 'Sałatka Cezar', calories: 490, carbohydrates: 20, protein: 36, fats: 32, kind: 'dinners', taste: 'salty' },
    { id: 116, name: 'Pieczeń rzymska', calories: 720, carbohydrates: 10, protein: 60, fats: 50, kind: 'dinners', taste: 'salty' },
    { id: 117, name: 'Kurczak z grilla', calories: 640, carbohydrates: 5, protein: 55, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 118, name: 'Moussaka', calories: 730, carbohydrates: 35, protein: 45, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 119, name: 'Tortilla hiszpańska', calories: 550, carbohydrates: 50, protein: 25, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 120, name: 'Gumbo z krewetkami', calories: 610, carbohydrates: 45, protein: 40, fats: 30, kind: 'dinners', taste: 'spicy' },
    { id: 122, name: 'Quiche z łososiem', calories: 710, carbohydrates: 40, protein: 30, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 123, name: 'Krem z pieczonej dyni', calories: 540, carbohydrates: 50, protein: 10, fats: 30, kind: 'dinners', taste: 'sweet' },
    { id: 124, name: 'Szparagi z holenderskim', calories: 470, carbohydrates: 10, protein: 20, fats: 40, kind: 'dinners', taste: 'salty' },
    { id: 125, name: 'Carpaccio z wołowiny', calories: 560, carbohydrates: 5, protein: 35, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 126, name: 'Tarta cytrynowa', calories: 690, carbohydrates: 90, protein: 8, fats: 35, kind: 'snacks', taste: 'sweet' },
    { id: 127, name: 'Churros z czekoladą', calories: 750, carbohydrates: 100, protein: 10, fats: 35, kind: 'snacks', taste: 'sweet' },
    { id: 128, name: 'Grillowana ośmiornica', calories: 610, carbohydrates: 10, protein: 50, fats: 45, kind: 'dinners', taste: 'salty' },
    { id: 129, name: 'Risotto z krewetkami', calories: 700, carbohydrates: 85, protein: 25, fats: 30, kind: 'dinners', taste: 'salty' },
    { id: 130, name: 'Tiramisu', calories: 560, carbohydrates: 45, protein: 15, fats: 35, kind: 'snacks', taste: 'sweet' },
  ];
  

  constructor() {
    this.updateElementData(this.elementsData);
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
    let loadingTimer;
    if (loading) {
      loadingTimer = setTimeout(() => {
        this.loadingSubject.next(false);
      }, 1500);
    } else {
      clearTimeout(loadingTimer);
    }
  }

  updateElementData(data: MealElement[]) {
    this.elementDataSubject.next(data);
  }

  setSelectedElement(element: MealElement) {
    this.selectedElementSubject.next(element);
  }

  filterMeals(filterOptions: any) {
    const mealElements: MealElement[] = this.elementsData;
    const filteredElements = mealElements.filter(element => {
      const caloriesCondition =
        (filterOptions.calories === "small" && element.calories < 300) ||
        (filterOptions.calories === "medium" && element.calories >= 300 && element.calories <= 700) ||
        (filterOptions.calories === "large" && element.calories > 700) ||
        !filterOptions.calories; 
      const kindCondition = !filterOptions.kind || element.kind === filterOptions.kind;
      const tasteCondition = !filterOptions.taste || element.taste === filterOptions.taste;

      return caloriesCondition && kindCondition && tasteCondition;
    });
    this.elementDataSubject.next(filteredElements);
  }
}

