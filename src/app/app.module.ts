import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalcheaderComponent } from './components/calcheader/calcheader.component';
import { CalcbuttonComponent } from './components/calcbutton/calcbutton.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalcoperandComponent } from './components/calcoperand/calcoperand.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/icon/icon.component';
import { IconmenuComponent } from './components/iconmenu/iconmenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
