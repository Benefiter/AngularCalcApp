import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { toastrService } from './testing/stubs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: ToastrService, useValue: toastrService}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title Calculator', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByTagName('h1')?.item(0)?.innerHTML).toContain('Calculator');
  });
});
