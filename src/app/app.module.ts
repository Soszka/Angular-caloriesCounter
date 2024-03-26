import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 

import { AppComponent } from './app.component'; 
import { HeaderComponent } from './navigation/header/header.component'; 
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';

import { AuthGuard } from './auth/auth.guard';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SharedModule,
    BrowserAnimationsModule, 
    HttpClientModule, 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}