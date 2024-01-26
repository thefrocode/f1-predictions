import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaguesJoinComponent } from './leagues-join.component';

describe('LeaguesJoinComponent', () => {
  let component: LeaguesJoinComponent;
  let fixture: ComponentFixture<LeaguesJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguesJoinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaguesJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
