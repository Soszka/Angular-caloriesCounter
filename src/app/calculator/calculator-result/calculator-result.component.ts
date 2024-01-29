import { Component } from '@angular/core';
import { faAppleWhole, faPersonRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator-result',
  templateUrl: './calculator-result.component.html',
  styleUrl: './calculator-result.component.scss'
})
export class CalculatorResultComponent {
  sectionName = "REZULTAT";
  sectionDescription = "Sprawdź swój rezultat i zapisz swoje zapotrzebowanie kaloryczne";
  faAppleWhole = faAppleWhole;
  faPersonRunning = faPersonRunning;
  faDumbbell = faDumbbell
}
