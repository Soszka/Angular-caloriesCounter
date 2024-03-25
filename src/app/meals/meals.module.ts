import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { MealsEditComponent } from './meals-edit/meals-edit.component';
import { MealsFormComponent } from './meals-form/meals-form.component';
import { MealsTableComponent } from './meals-table/meals-table.component';

const routes: Routes = [
  { path: '', component: MealsComponent },
];

@NgModule({
  declarations: [
    MealsComponent,
    MealsFormComponent,
    MealsEditComponent,
    MealsTableComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MealsModule { }