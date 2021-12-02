import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcbuttonComponent } from './calcbutton.component';

describe('CalcbuttonComponent', () => {
  let component: CalcbuttonComponent;
  let fixture: ComponentFixture<CalcbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component?.text).toBe('');
  });
});
