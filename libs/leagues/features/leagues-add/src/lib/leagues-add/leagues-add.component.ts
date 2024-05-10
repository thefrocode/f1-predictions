import { Component, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { radixPlus } from '@ng-icons/radix-icons';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { MatDialog } from '@angular/material/dialog';
import { AddLeagueDialogComponent } from '@f1-predictions/add-league-dialog';

@Component({
  selector: 'leagues-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leagues-add.component.html',
  styleUrls: ['./leagues-add.component.css'],
  providers: [],
})
export class LeaguesAddComponent {
  leaguesStore = inject(LeaguesStore);
  playersStore = inject(PlayersStore);

  @Input({
    required: true,
  })
  type!: string;

  constructor(private dialog: MatDialog) {}
  openCreateLeagueDialog() {
    const dialogRef = this.dialog.open(AddLeagueDialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      if (!this.playersStore.active_player()) return;

      this.leaguesStore.createLeague({
        name: result.name,
        owner_id: this.playersStore.active_player()!.id,
      });
    });
  }
}
