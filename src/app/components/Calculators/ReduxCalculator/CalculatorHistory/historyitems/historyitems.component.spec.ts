import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { storeMock } from 'src/app/testing/stubs';

import { HistoryitemsComponent } from './historyitems.component';

describe('HistoryitemsComponent', () => {
  let component: HistoryitemsComponent;
  let fixture: ComponentFixture<HistoryitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryitemsComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
