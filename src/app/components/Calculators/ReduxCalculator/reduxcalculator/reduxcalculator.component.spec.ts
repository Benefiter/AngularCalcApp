import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { toastrService } from 'src/app/testing/stubs';

import { ReduxcalculatorComponent } from './reduxcalculator.component';

describe('ReduxcalculatorComponent', () => {
  let component: ReduxcalculatorComponent;
  let fixture: ComponentFixture<ReduxcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxcalculatorComponent ],
      providers: [
        {provide: ToastrService, useValue: toastrService}
      ]
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
