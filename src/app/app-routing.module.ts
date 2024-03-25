import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { MealsComponent } from './meals/meals.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CaloriesComponent } from './calories/calories.component';
import { CalculatorResultComponent } from './calculator/calculator-result/calculator-result.component';
import { MealsEditComponent } from './meals/meals-edit/meals-edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calories', component: CaloriesComponent },
  { path: 'meals', component: MealsComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'result', component: CalculatorResultComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'meals/edit', component: MealsEditComponent, canActivate: [AuthGuard], },
  { path: 'meals/edit/:name', component: MealsEditComponent, canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
