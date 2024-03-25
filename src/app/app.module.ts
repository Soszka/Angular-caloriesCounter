import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 

import { AppComponent } from './app.component'; 
import { HeaderComponent } from './navigation/header/header.component'; 
import { FooterComponent } from './shared/footer/footer.component';

import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    HttpClientModule, 
    AppRoutingModule, 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}