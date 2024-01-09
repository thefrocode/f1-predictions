import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'f1-predictions-create-team-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.css'],
})
export class CreateTeamDialogComponent {
  createTeamForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateTeamDialogComponent>) {}
  ngOnInit(): void {
    this.createTeamForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.dialogRef.close(this.createTeamForm.value);
  }
}
