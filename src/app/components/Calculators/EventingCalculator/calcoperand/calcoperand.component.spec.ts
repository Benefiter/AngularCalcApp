import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcoperandComponent } from './calcoperand.component';

describe('CalcoperandComponent', () => {
  let component: CalcoperandComponent;
  let fixture: ComponentFixture<CalcoperandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcoperandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcoperandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component?.value).toBe('');
  });
});
