import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCalculatorButton } from '../calculator/calculator.component.spec';

import { CalcbuttonComponent } from './calcbutton.component';

describe('CalcbuttonComponent', () => {
  let component: CalcbuttonComponent;
  let fixture: ComponentFixture<CalcbuttonComponent>;
  let de: TestCalculatorButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcbuttonComponent);
    de = fixture?.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component?.text).toBe('');
  });
});
