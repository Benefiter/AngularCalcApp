import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { toastrServiceMock } from 'src/app/testing/stubs';
import { ReduxcalculatorComponent } from './reduxcalculator.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppStore, INITIAL_STATE } from 'src/app/redux/calculator.state.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { calculatorStateReducer } from 'src/app/redux/calculator.reducer';

type TestReduxCalculatorButton = DebugElement | undefined;

describe('ReduxcalculatorComponent', () => {
  let component: ReduxcalculatorComponent;
  let fixture: ComponentFixture<ReduxcalculatorComponent>;
  let de: DebugElement;
  let calculatorButtons: Array<DebugElement>;
  let store:  Store<IAppStore>;
  const initialState = INITIAL_STATE;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ calculatorState: calculatorStateReducer }),
      ],
      declarations: [ReduxcalculatorComponent],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture?.debugElement;
    calculatorButtons = de?.queryAll(By.css('app-reduxcalcbutton'));
  });

  function getAppCalcButton(testButtons: Array<DebugElement>, textId: string) {
    return testButtons?.find((t) => t.attributes['text'] === textId);
  }

  function getAppCalcButtonFromNgContext(
    testButtons: Array<DebugElement>,
    textId: string
  ) {
    const ngxCalcButton = testButtons?.find(
      (t) => t.context.$implicit?.buttonName === textId
    );
    return ngxCalcButton;
  }

  function clickCalculatorButton(button: string) {
    let calculatorButton: TestReduxCalculatorButton = getAppCalcButton(
      calculatorButtons,
      button
    );
    calculatorButton
      ? calculatorButton?.triggerEventHandler('click', button)
      : getAppCalcButtonFromNgContext(
          calculatorButtons,
          button
        )?.triggerEventHandler('click', button);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
