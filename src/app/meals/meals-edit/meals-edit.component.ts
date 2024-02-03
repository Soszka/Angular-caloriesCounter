import { Component } from '@angular/core';
import { faFire, faUtensils, faBurger, faBreadSlice, faDrumstickBite  } from '@fortawesome/free-solid-svg-icons';
import { MealElement, MealsService } from '../meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals-edit',
  templateUrl: './meals-edit.component.html',
  styleUrl: './meals-edit.component.scss'
})
export class MealsEditComponent {
  faFire = faFire;
  faUtensils = faUtensils;
  faBurger = faBurger;
  faBreadSlice = faBreadSlice;
  faDrumstickBite = faDrumstickBite;
  sectionName = "EDYCJA";
  sectionDescription = "Edytuj wybrany produkt i dodaj go do swojej listy !";

  selectedElement: MealElement | null = null;

  constructor(private mealsService: MealsService, private router: Router) {}

  ngOnInit() {
    this.mealsService.selectedElement$.subscribe(element => {
      this.selectedElement = element;
    });
  }

  onCancelCLick() {
    this.router.navigate(['meals']);
  }
}
