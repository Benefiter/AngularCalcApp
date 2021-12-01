import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalcheaderComponent } from './components/calcheader/calcheader.component';
import { CalcbuttonComponent } from './components/calcbutton/calcbutton.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcoperandComponent } from './components/calcoperand/calcoperand.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcheaderComponent,
    CalcbuttonComponent,
    CalculatorComponent,
    CalcoperandComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
