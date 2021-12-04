import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { storeMock, toastrService } from 'src/app/testing/stubs';
import { ReduxcalcbuttonComponent } from './reduxcalcbutton.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

describe('ReduxcalcbuttonComponent', () => {
  let component: ReduxcalcbuttonComponent;
  let fixture: ComponentFixture<ReduxcalcbuttonComponent>;
  let de: DebugElement;
  let calculatorButtons: Array<DebugElement>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ReduxcalcbuttonComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxcalcbuttonComponent);
    component = fixture.componentInstance;
    component.text = '+';
    fixture.detectChanges();
    de = fixture?.debugElement;
    calculatorButtons = de?.queryAll(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component?.text).toBe('+');
  });

  it('should dispatch button click action when clicked', () => {
    expect(calculatorButtons?.length).toBe(1);
    calculatorButtons[0]?.triggerEventHandler('click', '+');
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
    const allCalls = storeMock.dispatch.calls.all();
    const storeDispatchCallAction = allCalls[0]?.args[0];
    expect(storeDispatchCallAction).toEqual({ button: '+', type: 'SetButtonClick' });
  });
});
