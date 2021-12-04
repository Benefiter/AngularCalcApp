import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryitemsComponent } from './historyitems.component';

describe('HistoryitemsComponent', () => {
  let component: HistoryitemsComponent;
  let fixture: ComponentFixture<HistoryitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryitemsComponent ]
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
