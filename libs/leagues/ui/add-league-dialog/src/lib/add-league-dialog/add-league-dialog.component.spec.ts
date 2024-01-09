import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLeagueDialogComponent } from './add-league-dialog.component';

describe('AddLeagueDialogComponent', () => {
  let component: AddLeagueDialogComponent;
  let fixture: ComponentFixture<AddLeagueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLeagueDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
