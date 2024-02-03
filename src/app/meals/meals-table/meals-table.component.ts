import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


export interface Element {
  id: number
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
  kind: string;
  taste: string
}

const elementsData: Element[] = [
  {id: 1, name: 'Jogurt truskawkowy', calories: 250, carbohydrates: 30, protein: 12, fats: 8, kind: 'breakfasts', taste: 'sweet'},
  {id: 2, name: 'Sałatka cezar', calories: 800, carbohydrates: 20, protein: 35, fats: 65, kind: 'dinners', taste: 'salty'},
  {id: 3, name: 'Koktajl bananowy', calories: 450, carbohydrates: 60, protein: 8, fats: 15, kind: 'breakfasts', taste: 'sweet'},
  {id: 4, name: 'Kurczak curry', calories: 1200, carbohydrates: 45, protein: 50, fats: 30, kind: 'dinners', taste: 'salty'},
  {id: 5, name: 'Jajecznica z warzywami', calories: 600, carbohydrates: 10, protein: 25, fats: 40, kind: 'breakfasts', taste: 'salty'},
  {id: 6, name: 'Muffiny jagodowe', calories: 350, carbohydrates: 40, protein: 5, fats: 18, kind: 'snacks', taste: 'sweet'},
  {id: 7, name: 'Ryba  z ziołami', calories: 900, carbohydrates: 15, protein: 40, fats: 55, kind: 'dinners', taste: 'salty'},
  {id: 8, name: 'Owsianka z owocami', calories: 300, carbohydrates: 45, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet'},
  {id: 9, name: 'Kanapki z łososiem', calories: 550, carbohydrates: 30, protein: 20, fats: 25, kind: 'snacks', taste: 'salty'},
  {id: 10, name: 'Koktajl malinowy', calories: 400, carbohydrates: 50, protein: 9, fats: 12, kind: 'breakfasts', taste: 'sweet'},
  {id: 11, name: 'Sałatka grecka', calories: 700, carbohydrates: 20, protein: 15, fats: 55, kind: 'dinners', taste: 'salty'},
  {id: 12, name: 'Omelet z pieczarkami', calories: 500, carbohydrates: 5, protein: 20, fats: 35, kind: 'breakfasts', taste: 'salty'},
  {id: 13, name: 'Tosty z awokado', calories: 450, carbohydrates: 30, protein: 10, fats: 25, kind: 'snacks', taste: 'salty'},
  {id: 14, name: 'Koktajl mango', calories: 350, carbohydrates: 40, protein: 8, fats: 10, kind: 'breakfasts', taste: 'sweet'},
  {id: 15, name: 'Pierogi z mięsem', calories: 800, carbohydrates: 50, protein: 30, fats: 40, kind: 'dinners', taste: 'salty'},
  {id: 16, name: 'Jogurt naturalny', calories: 200, carbohydrates: 15, protein: 10, fats: 12, kind: 'snacks', taste: 'sweet'},
  {id: 17, name: 'Jajka na twardo', calories: 250, carbohydrates: 2, protein: 20, fats: 15, kind: 'breakfasts', taste: 'salty'},
  {id: 18, name: 'Koktajl arbuzowy', calories: 300, carbohydrates: 40, protein: 5, fats: 5, kind: 'breakfasts', taste: 'sweet'},
  {id: 19, name: 'Kurczak duszony', calories: 1100, carbohydrates: 30, protein: 45, fats: 50, kind: 'dinners', taste: 'salty'},
  {id: 20, name: 'Omlet z szynką', calories: 500, carbohydrates: 8, protein: 25, fats: 30, kind: 'breakfasts', taste: 'salty'},
  {id: 21, name: 'Koktajl truskawkowy', calories: 350, carbohydrates: 45, protein: 7, fats: 10, kind: 'breakfasts', taste: 'sweet'},
  {id: 22, name: 'Kasza z warzywami', calories: 600, carbohydrates: 50, protein: 12, fats: 20, kind: 'dinners', taste: 'salty'},
  {id: 23, name: 'Jogurt malinowy', calories: 230, carbohydrates: 20, protein: 12, fats: 10, kind: 'snacks', taste: 'sweet'},
  {id: 24, name: 'Chleb  z serem', calories: 450, carbohydrates: 30, protein: 15, fats: 20, kind: 'snacks', taste: 'salty'},
  {id: 25, name: 'Koktajl brzoskwiniowy', calories: 320, carbohydrates: 35, protein: 8, fats: 10, kind: 'breakfasts', taste: 'sweet'},
  {id: 26, name: 'Pieczone ziemniaki', calories: 500, carbohydrates: 40, protein: 5, fats: 25, kind: 'dinners', taste: 'salty'},
  {id: 27, name: 'Musli z owocami', calories: 280, carbohydrates: 35, protein: 6, fats: 8, kind: 'snacks', taste: 'sweet'},
  {id: 28, name: 'Sałatka z tuńczykiem', calories: 650, carbohydrates: 15, protein: 25, fats: 50, kind: 'dinners', taste: 'salty'},
  {id: 29, name: 'Koktajl jabłkowy', calories: 300, carbohydrates: 35, protein: 7, fats: 5, kind: 'breakfasts', taste: 'sweet'},
  {id: 30, name: 'Pasta z ciecierzycy', calories: 400, carbohydrates: 30, protein: 15, fats: 18, kind: 'snacks', taste: 'salty'},
  {id: 31, name: 'Omelet z serem', calories: 480, carbohydrates: 5, protein: 22, fats: 35, kind: 'breakfasts', taste: 'salty'},
];

@Component({
  selector: 'app-meals-table',
  templateUrl: './meals-table.component.html',
  styleUrl: './meals-table.component.scss'
})
export class MealsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'calories', 'carbohydrates', 'protein', 'fats', 'edit', 'add'];
  dataSource = new MatTableDataSource<Element>(elementsData);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {
 }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEditClick(element: Element) {
    console.log(element.id);
    this.router.navigate(['/meals/edit', element.id]);
  }
}

