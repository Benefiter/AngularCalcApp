import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { toastrService } from './testing/stubs';
import { RouterTestingModule } from "@angular/router/testing";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule
      ],
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
