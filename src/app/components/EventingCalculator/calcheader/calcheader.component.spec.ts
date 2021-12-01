import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcheaderComponent } from './calcheader.component';

describe('CalcheaderComponent', () => {
  let component: CalcheaderComponent;
  let fixture: ComponentFixture<CalcheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.operand).toBe('');
    expect(component.prevOperand).toBe('');
  });
});
