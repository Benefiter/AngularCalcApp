import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconmenuComponent } from './iconmenu.component';

describe('IconmenuComponent', () => {
  let component: IconmenuComponent;
  let fixture: ComponentFixture<IconmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
