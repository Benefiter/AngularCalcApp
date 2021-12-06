import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalcbuttonComponent } from './components/Calculators/EventingCalculator/calcbutton/calcbutton.component';
import { CalculatorComponent } from './components/Calculators/EventingCalculator/calculator/calculator.component';
import { CalcoperandComponent } from './components/Calculators/EventingCalculator/calcoperand/calcoperand.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/Calculators/icon/icon.component';
import { IconmenuComponent } from './components/Calculators/iconmenu/iconmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CalcheaderComponent } from './components/Calculators/EventingCalculator/calcheader/calcheader.component';
import { StoreModule } from '@ngrx/store';
import { calculatorStateReducer } from './redux/calculator.reducer';
import { ReduxcalcbuttonComponent } from './components/Calculators/ReduxCalculator/reduxcalcbutton/reduxcalcbutton.component';
import { ReduxcalcheaderComponent } from './components/Calculators/ReduxCalculator/reduxcalcheader/reduxcalcheader.component';
import { ReduxcalcoperandComponent } from './components/Calculators/ReduxCalculator/reduxcalcoperand/reduxcalcoperand.component';
import { ReduxcalculatorComponent } from './components/Calculators/ReduxCalculator/reduxcalculator/reduxcalculator.component';
import { NotificationService } from './services/notification.service';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/charts/chart/chart.component';
import { ChartModule } from 'angular2-chartjs';
import { HistoryitemComponent } from './components/Calculators/ReduxCalculator/CalculatorHistory/historyitem/historyitem.component';
import { HistoryitemsComponent } from './components/Calculators/ReduxCalculator/CalculatorHistory/historyitems/historyitems.component';
import { DndModule, DndService } from "@ng-dnd/core";
import { HTML5Backend } from 'react-dnd-html5-backend'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';

const appRoutes: Routes = [
  {path: '', component: CalculatorComponent, data: {animation: 'isLeft'}},
  {path: 'redux', component: ReduxcalculatorComponent, data: {animation: 'isRight'}}
]
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
    ChartComponent,
    HistoryitemComponent,
    HistoryitemsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ calculatorState: calculatorStateReducer }),
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    ChartModule,
    DndModule.forRoot({ backend: HTML5Backend }),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [NotificationService, ToastrService, DndService,],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
