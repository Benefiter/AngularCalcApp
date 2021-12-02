import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxcalcoperandComponent } from './reduxcalcoperand.component';

describe('ReduxcalcoperandComponent', () => {
  let component: ReduxcalcoperandComponent;
  let fixture: ComponentFixture<ReduxcalcoperandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxcalcoperandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxcalcoperandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component?.value).toBe('');
  });
});
