import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { toastrService } from 'src/app/testing/stubs';

import { ReduxcalcbuttonComponent } from './reduxcalcbutton.component';

describe('ReduxcalcbuttonComponent', () => {
  let component: ReduxcalcbuttonComponent;
  let fixture: ComponentFixture<ReduxcalcbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxcalcbuttonComponent ],
      providers: [
        {provide: ToastrService, useValue: toastrService}
      ]
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
