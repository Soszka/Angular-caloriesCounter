import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'calories', loadChildren: () => import('./calories/calories.module').then(m => m.CaloriesModule) },
  { path: 'meals', loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule) },
  { path: 'calculator', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}