import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxcalculatorComponent } from './reduxcalculator.component';

describe('ReduxcalculatorComponent', () => {
  let component: ReduxcalculatorComponent;
  let fixture: ComponentFixture<ReduxcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxcalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
