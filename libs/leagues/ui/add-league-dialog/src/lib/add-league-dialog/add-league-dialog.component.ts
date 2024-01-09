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
  selector: 'f1-predictions-add-league-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-league-dialog.component.html',
  styleUrls: ['./add-league-dialog.component.css'],
})
export class AddLeagueDialogComponent {
  createLeagueForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddLeagueDialogComponent>) {}
  ngOnInit(): void {
    this.createLeagueForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.dialogRef.close(this.createLeagueForm.value);
  }
}
