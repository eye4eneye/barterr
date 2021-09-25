import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { TradeLikelihoodCalculatorComponent } from './components/trade-likelihood-calculator/trade-likelihood-calculator.component';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './shared/routing/app-routing.module';
import { SneakersService } from 'sneakerDatabaseAPI';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/signup/signup.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    TradeLikelihoodCalculatorComponent,
    SignupComponent,
    ErrorAlertComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule
  ],
  providers: [SneakersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
