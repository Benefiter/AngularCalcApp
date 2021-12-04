import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { ChartComponent } from './chart.component';
import { ToastrService } from 'ngx-toastr';
import { storeMock, toastrService } from 'src/app/testing/stubs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
