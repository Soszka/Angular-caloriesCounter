import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CaloriesComponent } from './calories.component';
import { CaloriesDiagramComponent } from './calories-diagram/calories-diagram.component';
import { CaloriesTableComponent } from './calories-table/calories-table.component';

const routes: Routes = [
  { path: '', component: CaloriesComponent },
];

@NgModule({
  declarations: [
    CaloriesComponent,
    CaloriesDiagramComponent,
    CaloriesTableComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CaloriesModule { }