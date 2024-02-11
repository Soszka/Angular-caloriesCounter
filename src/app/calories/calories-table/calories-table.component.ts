import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CaloriesService } from '../calories.service';
import { AddedMeal } from '../../meals/meal.model';

export interface addedElement {
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
}

const addedElements: addedElement[] = [];

@Component({
  selector: 'app-calories-table',
  templateUrl: './calories-table.component.html',
  styleUrl: './calories-table.component.scss'
})
export class CaloriesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'calories', 'carbohydrates', 'protein', 'fats', 'remove'];
  dataSource = new MatTableDataSource<addedElement>(addedElements);
  showMessage: boolean = false;
  messageInfo = "Usunięto wybrany produkt !"

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private caloriesService: CaloriesService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.caloriesService.addedElements$.subscribe(elements => {
      this.dataSource.data = elements;
    });
  }

  removeElement(element: AddedMeal) {
    this.caloriesService.removeElement(element);
    this.caloriesService.callUpdateCaloriesMessage();
    this.showMessage = true;
  }

  onOkClick() {
    this.showMessage = false;
  }
}
