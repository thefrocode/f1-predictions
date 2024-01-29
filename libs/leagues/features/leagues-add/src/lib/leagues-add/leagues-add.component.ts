import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { radixPlus } from '@ng-icons/radix-icons';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { MatDialog } from '@angular/material/dialog';
import { AddLeagueDialogComponent } from '@f1-predictions/add-league-dialog';

@Component({
  selector: 'leagues-add',
  standalone: true,
  imports: [CommonModule, HlmIconComponent],
  templateUrl: './leagues-add.component.html',
  styleUrls: ['./leagues-add.component.css'],
  providers: [provideIcons({ radixPlus })],
})
export class LeaguesAddComponent {
  leaguesStore = inject(LeaguesStore);
  playersStore = inject(PlayersStore);

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
