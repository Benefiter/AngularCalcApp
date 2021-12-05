import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DndService } from '@ng-dnd/core';
import { Store } from '@ngrx/store';
import { storeMock, dndServiceMock } from 'src/app/testing/stubs';

import { HistoryitemComponent } from './historyitem.component';

describe('HistoryitemComponent', () => {
  let component: HistoryitemComponent;
  let fixture: ComponentFixture<HistoryitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryitemComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: DndService, useValue: dndServiceMock}
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
