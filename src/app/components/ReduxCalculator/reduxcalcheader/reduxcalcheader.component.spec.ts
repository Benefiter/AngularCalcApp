import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxcalcheaderComponent } from './reduxcalcheader.component';

describe('ReduxcalcheaderComponent', () => {
  let component: ReduxcalcheaderComponent;
  let fixture: ComponentFixture<ReduxcalcheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxcalcheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxcalcheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
