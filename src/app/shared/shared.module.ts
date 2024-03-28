import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TitleComponent } from './title/title.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';


const components = [
  TitleComponent,
  InfoDialogComponent
]

const modulesImportExport = [

  // ANGULAR
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  
  // ANGULAR MATERIAL
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatPaginatorModule ,
  MatTableModule,
  MatSidenavModule,

  // FONTAWESOME
  FontAwesomeModule
]

@NgModule({
  imports: [...modulesImportExport],
  declarations: [...components],
  exports: [...modulesImportExport, ...components],
  providers: [],
})
export class SharedModule {}
