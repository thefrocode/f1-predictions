import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTeamlockDeadlineComponent } from './home-teamlock-deadline.component';

describe('HomeTeamlockDeadlineComponent', () => {
  let component: HomeTeamlockDeadlineComponent;
  let fixture: ComponentFixture<HomeTeamlockDeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTeamlockDeadlineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTeamlockDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
