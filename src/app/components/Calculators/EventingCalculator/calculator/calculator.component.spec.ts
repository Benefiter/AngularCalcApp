import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { toastrServiceMock } from 'src/app/testing/stubs';

import { CalculatorComponent } from './calculator.component';

type TestCalculatorButton = DebugElement | undefined;

describe('CalculatorComponent', () => {
  
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let de: DebugElement;
  let calculatorButtons: Array<DebugElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      providers: [
        {provide: ToastrService, useValue: toastrServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture?.detectChanges();
    de = fixture?.debugElement;
    calculatorButtons = de?.queryAll(By.css('app-calcbutton'));
  });

  function getAppCalcButton(testButtons: Array<DebugElement>, textId: string) {
    return testButtons?.find(t => t.attributes['text'] === textId)
  }

  function getAppCalcButtonFromNgContext(testButtons: Array<DebugElement>, textId: string) {
    return testButtons?.find(t => t.context.$implicit?.buttonName === textId)
  }

  function clickCalculatorButton(button: string) {
    let calculatorButton: TestCalculatorButton = getAppCalcButton(calculatorButtons, button);
    calculatorButton 
    ? calculatorButton?.triggerEventHandler('calcButtonClick', button)
    : getAppCalcButtonFromNgContext(calculatorButtons, button)?.triggerEventHandler('calcButtonClick', button);
  }

  it('should create', () => {
    expect(component)?.toBeTruthy();
    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('');
  });

  it('should set operand to 11', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('1');

    expect(component?.operand)?.toBe('11');
    expect(component?.prevOperand)?.toBe('');
  });

  it('should set operand to 22, operator to + and prevOperand to 11 +', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('1');
    clickCalculatorButton('+');
    clickCalculatorButton('2');
    clickCalculatorButton('2');

    expect(component?.operand)?.toBe('22');
    expect(component?.prevOperand)?.toBe('11 +');
    expect(component?.currentOperation)?.toBe('+');
  });

  it('should correctly set  operand, prevOperand and currentOperation after "11 + 22 =', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('1');
    clickCalculatorButton('+');
    clickCalculatorButton('2');
    clickCalculatorButton('2');
    clickCalculatorButton('=');
  

    expect(component?.operand)?.toBe('33');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should clear context when AC is clicked', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('1');
    clickCalculatorButton('+');
    clickCalculatorButton('2');
    clickCalculatorButton('2');
    clickCalculatorButton('=');
    clickCalculatorButton('AC');

    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should ignore more than 1 decimal point', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('.');
    clickCalculatorButton('1');
    clickCalculatorButton('.');

    expect(component?.operand)?.toBe('1.1');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should ignore = button when no operand or prevOperand', () => {
    clickCalculatorButton('=');

    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should ignore = button when no prevOperand', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('.');
    clickCalculatorButton('1');
    clickCalculatorButton('=');

    expect(component?.operand)?.toBe('1.1');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should Delete last number of operand when Del clicked and operand exists', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('.');
    clickCalculatorButton('1');
    clickCalculatorButton('Del');

    expect(component?.operand)?.toBe('1.');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should Delete operation from prevOperand and reset operand and prevOperand when Del clicked after operation button clicked', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('.');
    clickCalculatorButton('1');
    clickCalculatorButton('+');

    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('1.1 +');
    expect(component?.currentOperation)?.toBe('+');

    clickCalculatorButton('Del');

    expect(component?.operand)?.toBe('1.1');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should ignore operation buttons if no operand', () => {
    clickCalculatorButton('-');
    clickCalculatorButton('+');
    clickCalculatorButton('/');
    clickCalculatorButton('*');

    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');
  });

  it('should ignore contiguous operation buttons', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('+');
    clickCalculatorButton('/');

    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('1 +');
    expect(component?.currentOperation)?.toBe('+');
  });

  it('should restore operand and reset prevOperand operation with button sequence 1 + 2 Del Del', () => {
    clickCalculatorButton('1');
    clickCalculatorButton('+');
    clickCalculatorButton('2');
    expect(component?.operand)?.toBe('2');
    expect(component?.prevOperand)?.toBe('1 +');
    expect(component?.currentOperation)?.toBe('+');

    clickCalculatorButton('Del');
    expect(component?.operand)?.toBe('');
    expect(component?.prevOperand)?.toBe('1 +');
    expect(component?.currentOperation)?.toBe('+');

    clickCalculatorButton('Del');
    expect(component?.operand)?.toBe('1');
    expect(component?.prevOperand)?.toBe('');
    expect(component?.currentOperation)?.toBe('');

  });

});
