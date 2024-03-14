import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MealsComponent } from './meals/meals.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CaloriesComponent } from './calories/calories.component';
import { CalculatorResultComponent } from './calculator/calculator-result/calculator-result.component';
import { MealsEditComponent } from './meals/meals-edit/meals-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calories', component: CaloriesComponent },
  { path: 'meals', component: MealsComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'result', component: CalculatorResultComponent },
  { path: 'meals/edit/:id', component: MealsEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
