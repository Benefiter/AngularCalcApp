import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxiconmenuComponent } from './reduxiconmenu.component';

describe('ReduxiconmenuComponent', () => {
  let component: ReduxiconmenuComponent;
  let fixture: ComponentFixture<ReduxiconmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReduxiconmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxiconmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
