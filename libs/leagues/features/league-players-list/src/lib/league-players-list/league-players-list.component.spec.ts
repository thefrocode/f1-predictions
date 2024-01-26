import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaguePlayersListComponent } from './league-players-list.component';

describe('LeaguePlayersListComponent', () => {
  let component: LeaguePlayersListComponent;
  let fixture: ComponentFixture<LeaguePlayersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguePlayersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaguePlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
