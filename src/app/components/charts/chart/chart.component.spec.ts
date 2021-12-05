import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { ChartComponent } from './chart.component';
import { ToastrService } from 'ngx-toastr';
import { dndServiceMock, storeMock, toastrServiceMock } from 'src/app/testing/stubs';
import { DndService } from '@ng-dnd/core';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: DndService, useValue: dndServiceMock}
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
