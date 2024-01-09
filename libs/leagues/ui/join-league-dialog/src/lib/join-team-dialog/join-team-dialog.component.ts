import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '@f1-predictions/models';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'f1-predictions-join-team-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './join-team-dialog.component.html',
  styleUrls: ['./join-team-dialog.component.css'],
})
export class JoinTeamDialogComponent {
  joinLeagueForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<JoinTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { teams: Team[] }
  ) {}

  ngOnInit(): void {
    this.joinLeagueForm = new FormGroup({
      team_id: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.dialogRef.close(this.joinLeagueForm.value);
  }
}
