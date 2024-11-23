import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  appDescription: string = `Apliakcja ta ma za zadanie ułatwić Ci wyliczenie dziennego spożycia kalorycznego.
  Klikajac w poniższy przycisk przejdziesz do kalkulatora który po wprowadzeniu twoich danych
  obliczy Twój wskaźnik BMR oraz oszacuje twoje dzienne zapotrzebowanie kaloryczne. Podpowie on również ile
  kalorii powinieneś spożywać aby osiągnąć swój cel. W zakładce "POSIŁKI" znajdziesz
  formularz dzięki któremu możesz pobrać odpowiednie produkty z dokładnym opisem
  wyszczególnionym w tabeli. Każdy produkt możesz edytować a także dodawać do twojej
  dziennej listy spożytych produktów, którą znajdziesz w zakładce - KALORIE. Tam również znajduje
  się diagram reprezentujacy twoje dzienne spożycie poszczególnych makroskładników. Zaczynajmy !`;
}
