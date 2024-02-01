import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface Element {
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
  kind: string;
  taste: string
}

const ELEMENT_DATA: Element[] = [
  {name: 'Jogurt truskawkowy', calories: 250, carbohydrates: 30, protein: 12, fats: 8, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Sałatka cezar', calories: 800, carbohydrates: 20, protein: 35, fats: 65, kind: 'dinners', taste: 'salty'},
  {name: 'Koktajl bananowy', calories: 450, carbohydrates: 60, protein: 8, fats: 15, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Kurczak curry', calories: 1200, carbohydrates: 45, protein: 50, fats: 30, kind: 'dinners', taste: 'salty'},
  {name: 'Jajecznica z warzywami', calories: 600, carbohydrates: 10, protein: 25, fats: 40, kind: 'breakfasts', taste: 'salty'},
  {name: 'Muffiny jagodowe', calories: 350, carbohydrates: 40, protein: 5, fats: 18, kind: 'snacks', taste: 'sweet'},
  {name: 'Ryba pieczona z ziołami', calories: 900, carbohydrates: 15, protein: 40, fats: 55, kind: 'dinners', taste: 'salty'},
  {name: 'Owsianka z suszonymi owocami', calories: 300, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Kanapki z łososiem', calories: 550, carbohydrates: 30, protein: 20, fats: 25, kind: 'snacks', taste: 'salty'},
  {name: 'Koktajl malinowy', calories: 400, carbohydrates: 50, protein: 9, fats: 12, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Sałatka grecka', calories: 700, carbohydrates: 20, protein: 15, fats: 55, kind: 'dinners', taste: 'salty'},
  {name: 'Omelet z pieczarkami', calories: 500, carbohydrates: 5, protein: 20, fats: 35, kind: 'breakfasts', taste: 'salty'},
  {name: 'Tosty z awokado', calories: 450, carbohydrates: 30, protein: 10, fats: 25, kind: 'snacks', taste: 'salty'},
  {name: 'Koktajl mango', calories: 350, carbohydrates: 40, protein: 8, fats: 10, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Pierogi z mięsem', calories: 800, carbohydrates: 50, protein: 30, fats: 40, kind: 'dinners', taste: 'salty'},
  {name: 'Jogurt naturalny', calories: 200, carbohydrates: 15, protein: 10, fats: 12, kind: 'snacks', taste: 'sweet'},
  {name: 'Jajka na twardo', calories: 250, carbohydrates: 2, protein: 20, fats: 15, kind: 'breakfasts', taste: 'salty'},
  {name: 'Koktajl arbuzowy', calories: 300, carbohydrates: 40, protein: 5, fats: 5, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Kurczak duszony w sosie pomidorowym', calories: 1100, carbohydrates: 30, protein: 45, fats: 50, kind: 'dinners', taste: 'salty'},
  {name: 'Omlet z szynką', calories: 500, carbohydrates: 8, protein: 25, fats: 30, kind: 'breakfasts', taste: 'salty'},
  {name: 'Koktajl truskawkowy', calories: 350, carbohydrates: 45, protein: 7, fats: 10, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Kasza jaglana z warzywami', calories: 600, carbohydrates: 50, protein: 12, fats: 20, kind: 'dinners', taste: 'salty'},
  {name: 'Jogurt malinowy', calories: 230, carbohydrates: 20, protein: 12, fats: 10, kind: 'snacks', taste: 'sweet'},
  {name: 'Chleb pełnoziarnisty z serem', calories: 450, carbohydrates: 30, protein: 15, fats: 20, kind: 'snacks', taste: 'salty'},
  {name: 'Koktajl brzoskwiniowy', calories: 320, carbohydrates: 35, protein: 8, fats: 10, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Pieczone ziemniaki', calories: 500, carbohydrates: 40, protein: 5, fats: 25, kind: 'dinners', taste: 'salty'},
  {name: 'Musli z suszonymi owocami', calories: 280, carbohydrates: 35, protein: 6, fats: 8, kind: 'snacks', taste: 'sweet'},
  {name: 'Sałatka z tuńczykiem', calories: 650, carbohydrates: 15, protein: 25, fats: 50, kind: 'dinners', taste: 'salty'},
  {name: 'Koktajl jabłkowy', calories: 300, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet'},
  {name: 'Pasta z ciecierzycy', calories: 400, carbohydrates: 30, protein: 15, fats: 18, kind: 'snacks', taste: 'salty'},
  {name: 'Omelet z serem', calories: 480, carbohydrates: 5, protein: 22, fats: 35, kind: 'breakfasts', taste: 'salty'},
];


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent implements AfterViewInit {
  sectionName = "ŻYWNOŚĆ";
  sectionDescription = "Przefiltruj wybrane posiłki i dodaj je do swojej listy";
  displayedColumns: string[] = ['name', 'calories', 'carbohydrates', 'protein', 'fats', 'edit', 'add'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


