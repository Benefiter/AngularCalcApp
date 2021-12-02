import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxiconComponent } from './reduxicon.component';

describe('ReduxiconComponent', () => {
  let component: ReduxiconComponent;
  let fixture: ComponentFixture<ReduxiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxiconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
