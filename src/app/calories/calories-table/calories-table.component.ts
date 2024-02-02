import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface addedElement {
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
}

const ELEMENT_DATA: addedElement[] = [
  {name: 'Jogurt truskawkowy', calories: 250, carbohydrates: 30, protein: 12, fats: 8},
  {name: 'Sałatka cezar', calories: 800, carbohydrates: 20, protein: 35, fats: 65},
  {name: 'Koktajl bananowy', calories: 450, carbohydrates: 60, protein: 8, fats: 15},
  {name: 'Kurczak curry', calories: 1200, carbohydrates: 45, protein: 50, fats: 30},
  {name: 'Jajecznica z warzywami', calories: 600, carbohydrates: 10, protein: 25, fats: 40},
  {name: 'Muffiny jagodowe', calories: 350, carbohydrates: 40, protein: 5, fats: 18},
  {name: 'Ryba pieczona z ziołami', calories: 900, carbohydrates: 15, protein: 40, fats: 55},
  {name: 'Owsianka z  owocami', calories: 300, carbohydrates: 45, protein: 7, fats: 5}
];


@Component({
  selector: 'app-calories-table',
  templateUrl: './calories-table.component.html',
  styleUrl: './calories-table.component.scss'
})
export class CaloriesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'calories', 'carbohydrates', 'protein', 'fats', 'remove'];
  dataSource = new MatTableDataSource<addedElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
