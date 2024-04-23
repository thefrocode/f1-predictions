import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictionsTeamListComponent } from './predictions-team-list.component';

describe('PredictionsTeamListComponent', () => {
  let component: PredictionsTeamListComponent;
  let fixture: ComponentFixture<PredictionsTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsTeamListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
