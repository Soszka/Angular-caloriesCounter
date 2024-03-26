import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator.component';
import { CalculatorResultComponent } from './calculator-result/calculator-result.component';

const routes: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'result', component: CalculatorResultComponent }
];

@NgModule({
  declarations: [
    CalculatorComponent,
    CalculatorResultComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CalculatorModule { }
