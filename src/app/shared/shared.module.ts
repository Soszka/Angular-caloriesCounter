import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './footer/footer.component';
import { Title } from '@angular/platform-browser';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';



const components = [
  FooterComponent,
  Title,
  InfoDialogComponent
]

const modulesImportExport = [

  // ANGULAR
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  
  // ANGULAR MATERIAL
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatPaginatorModule ,
  MatTableModule,

  // FONTAWESOME
  FontAwesomeModule
]

@NgModule({
  imports: [...modulesImportExport],
  declarations: [...components],
  exports: [...modulesImportExport],
  providers: [],
})
export class SharedModule {}
