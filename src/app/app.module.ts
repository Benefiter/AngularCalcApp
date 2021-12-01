import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalcbuttonComponent } from './components/EventingCalculator/calcbutton/calcbutton.component';
import { CalculatorComponent } from './components/EventingCalculator/calculator/calculator.component';
import { CalcoperandComponent } from './components/EventingCalculator/calcoperand/calcoperand.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/EventingCalculator/icon/icon.component';
import { IconmenuComponent } from './components/EventingCalculator/iconmenu/iconmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CalcheaderComponent } from './components/EventingCalculator/calcheader/calcheader.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcheaderComponent,
    CalcbuttonComponent,
    CalculatorComponent,
    CalcoperandComponent,
    IconComponent,
    IconmenuComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
