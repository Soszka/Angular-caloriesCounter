import { Component } from '@angular/core';
import { faFire, faUtensils, faBurger, faBreadSlice, faDrumstickBite  } from '@fortawesome/free-solid-svg-icons';

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
}
