import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinTeamDialogComponent } from './join-team-dialog.component';

describe('JoinTeamDialogComponent', () => {
  let component: JoinTeamDialogComponent;
  let fixture: ComponentFixture<JoinTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTeamDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
