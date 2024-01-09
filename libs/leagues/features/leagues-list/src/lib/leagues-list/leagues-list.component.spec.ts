import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaguesListComponent } from './leagues-list.component';

describe('LeaguesListComponent', () => {
  let component: LeaguesListComponent;
  let fixture: ComponentFixture<LeaguesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaguesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
