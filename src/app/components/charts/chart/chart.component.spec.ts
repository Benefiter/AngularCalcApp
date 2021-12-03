import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ChartComponent } from './chart.component';
import { IAppState } from './../../../store';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let storeMock: { dispatch: any , select: any, subscribe: any};

  beforeEach(async () => {
    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      select: () => new Observable<IAppState>(),
      subscribe: jasmine.createSpy('subscribe')
    };

    await TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
      ],
    })
    .compileComponents();
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
