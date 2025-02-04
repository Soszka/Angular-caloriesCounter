import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MealsService, MealElement } from '../meals.service';
import { AddedMeal } from '../meal.model';
import { CaloriesService } from '../../calories/calories.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-meals-table',
  templateUrl: './meals-table.component.html',
  styleUrl: './meals-table.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MealsTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'calories',
    'add',
    'carbohydrates',
    'protein',
    'fats',
    'remove',
    'edit',
  ];
  dataSource = new MatTableDataSource<MealElement>([]);
  showMessage: boolean = false;
  messageInfo!: string;
  loading: boolean = false;
  isLoggedIn: boolean = false;
  shouldNavigate: boolean = false;
  private subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private mealsService: MealsService,
    private caloriesService: CaloriesService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    const sub1 = this.mealsService.fetchMeals().subscribe();
    const sub2 = this.mealsService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    const sub3 = this.mealsService.elementData$.subscribe((data) => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
    const sub4 = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.subscriptions.push(sub1, sub2, sub3, sub4);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddMeal() {
    if (!this.isLoggedIn) {
      this.showMessageWithRedirect(
        'Musisz się zalogować, aby dodać nowy posiłek.'
      );
    } else {
      this.mealsService.setEditMode('add');
      this.mealsService.setSelectedElement(null);
      this.router.navigate(['/meals/edit']);
    }
  }

  onEditClick(element: MealElement) {
    if (!this.isLoggedIn) {
      this.showMessageWithRedirect(
        'Musisz się zalogować, aby edytować posiłek.'
      );
    } else {
      this.mealsService.setEditMode('edit');
      this.mealsService.setSelectedElement(element);
      this.router.navigate(['/meals/edit', element.name]);
    }
  }

  onRemoveClick(element: MealElement) {
    if (!this.isLoggedIn) {
      this.showMessageWithRedirect('Musisz się zalogować, aby usunąć posiłek.');
    } else {
      const confirmation = confirm(
        `Czy na pewno chcesz usunąć produkt: ${element.name} z listy produktów?`
      );
      if (confirmation) {
        this.mealsService.removeMeal(element).subscribe(() => {
          this.messageInfo = `Pomyślnie usunięto '${element.name}' z tabeli produktów`;
          this.showMessage = true;
          this.dataSource.filter = '';
        });
      }
    }
  }

  private showMessageWithRedirect(message: string) {
    this.messageInfo = message;
    this.showMessage = true;
    this.shouldNavigate = true;
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
    this.messageInfo =
      'Pomyślnie dodano produkt ! Możesz go teraz zobaczyć w zakładce KALORIE';
    this.showMessage = true;
  }

  onOkClick() {
    this.showMessage = false;
    if (this.shouldNavigate) {
      this.router.navigate(['/auth']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
