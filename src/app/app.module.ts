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
import { StoreModule } from '@ngrx/store';
import { calculatorStateReducer } from './redux/calculator.reducer';
import { ReduxcalcbuttonComponent } from './components/ReduxCalculator/reduxcalcbutton/reduxcalcbutton.component';
import { ReduxcalcheaderComponent } from './components/ReduxCalculator/reduxcalcheader/reduxcalcheader.component';
import { ReduxcalcoperandComponent } from './components/ReduxCalculator/reduxcalcoperand/reduxcalcoperand.component';
import { ReduxcalculatorComponent } from './components/ReduxCalculator/reduxcalculator/reduxcalculator.component';
import { ReduxiconComponent } from './components/ReduxCalculator/reduxicon/reduxicon.component';
import { ReduxiconmenuComponent } from './components/ReduxCalculator/reduxiconmenu/reduxiconmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcheaderComponent,
    CalcbuttonComponent,
    CalculatorComponent,
    CalcoperandComponent,
    IconComponent,
    IconmenuComponent,
    ReduxcalcbuttonComponent,
    ReduxcalcheaderComponent,
    ReduxcalcoperandComponent,
    ReduxcalculatorComponent,
    ReduxiconComponent,
    ReduxiconmenuComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({calculatorState: calculatorStateReducer}),
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
