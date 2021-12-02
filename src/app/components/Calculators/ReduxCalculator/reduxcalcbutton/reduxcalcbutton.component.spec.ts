import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxcalcbuttonComponent } from './reduxcalcbutton.component';

describe('ReduxcalcbuttonComponent', () => {
  let component: ReduxcalcbuttonComponent;
  let fixture: ComponentFixture<ReduxcalcbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxcalcbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxcalcbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component?.text).toBe('');
  });
});
