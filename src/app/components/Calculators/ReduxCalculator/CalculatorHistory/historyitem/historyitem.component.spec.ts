import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryitemComponent } from './historyitem.component';

describe('HistoryitemComponent', () => {
  let component: HistoryitemComponent;
  let fixture: ComponentFixture<HistoryitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryitemComponent ]
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
