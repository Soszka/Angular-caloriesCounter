import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MealsService, MealElement } from '../meals.service';
import { AddedMeal } from '../meal.model';
import { CaloriesService } from '../../calories/calories.service';


@Component({
  selector: 'app-meals-table',
  templateUrl: './meals-table.component.html',
  styleUrl: './meals-table.component.scss'
})
export class MealsTableComponent implements  AfterViewInit {
  displayedColumns: string[] = ['name', 'calories', 'carbohydrates', 'protein', 'fats', 'remove', 'edit', 'add'];
  dataSource = new MatTableDataSource<MealElement>([]);
  showMessage: boolean = false;
  messageInfo = "Pomyślnie dodano produkt ! Możesz go teraz zobaczyć w zakładce KALORIE"
  loading: boolean = false;
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,
     private mealsService: MealsService,
     private caloriesService: CaloriesService) {}

  ngAfterViewInit() {
    this.mealsService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.mealsService.elementData$.subscribe(data => {
      setTimeout(() => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddMeal() {
    this.mealsService.setEditMode('add');
    this.mealsService.setSelectedElement(null);
    this.router.navigate(['/meals/edit']);
  }

  onEditClick(element: MealElement) {
    this.mealsService.setEditMode('edit');
    this.mealsService.setSelectedElement(element);
    this.router.navigate(['/meals/edit', element.name]);
  }

  onRemoveClick(element: MealElement) {
    this.mealsService.removeMeal(element);
  }

  onAddClick(element: MealElement) {
    const addedMeal = new AddedMeal(
      element.name,
      element.calories,
      element.fats,
      element.protein,
      element.carbohydrates
    );
    this.caloriesService.addElement(addedMeal);
    this.showMessage = true;
  }

  onOkClick() {
    this.showMessage = false;
  }
}

