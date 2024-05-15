import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSessionTimesComponent } from './home-session-times.component';

describe('HomeSessionTimesComponent', () => {
  let component: HomeSessionTimesComponent;
  let fixture: ComponentFixture<HomeSessionTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSessionTimesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSessionTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
