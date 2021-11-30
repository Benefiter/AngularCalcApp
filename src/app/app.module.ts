import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalcheaderComponent } from './components/calcheader/calcheader.component';
import { CalcbuttonComponent } from './components/calcbutton/calcbutton.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcoperandComponent } from './components/calcoperand/calcoperand.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcheaderComponent,
    CalcbuttonComponent,
    CalculatorComponent,
    CalcoperandComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
