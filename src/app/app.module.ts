import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TitleComponent } from './shared/title/title.component';
import { CalculatorResultComponent } from './calculator/calculator-result/calculator-result.component';
import { MealsComponent } from './meals/meals.component';
import { MealsFormComponent } from './meals/meals-form/meals-form.component';
import { CaloriesComponent } from './calories/calories.component';
import { CaloriesDiagramComponent } from './calories/calories-diagram/calories-diagram.component';
import { CaloriesTableComponent } from './calories/calories-table/calories-table.component';
import { MealsEditComponent } from './meals/meals-edit/meals-edit.component';
import { MealsTableComponent } from './meals/meals-table/meals-table.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';

import { MealsService } from './meals/meals.service';
import { InfoDialogComponent } from './shared/info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CalculatorComponent,
    TitleComponent,
    CalculatorResultComponent,
    MealsComponent,
    MealsFormComponent,
    CaloriesComponent,
    CaloriesDiagramComponent,
    CaloriesTableComponent,
    MealsEditComponent,
    MealsTableComponent,
    FooterComponent,
    SidenavComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [MealsService],
  bootstrap: [AppComponent],
})
export class AppModule {}