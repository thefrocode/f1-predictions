import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { radixEnter } from '@ng-icons/radix-icons';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { TeamsStore } from '@f1-predictions/teams-store';
import { MatDialog } from '@angular/material/dialog';

import { JoinTeamDialogComponent } from '@f1-predictions/join-team-dialog';

@Component({
  selector: 'f1-predictions-leagues-join',
  standalone: true,
  imports: [CommonModule, HlmIconComponent],
  templateUrl: './leagues-join.component.html',
  styleUrls: ['./leagues-join.component.css'],
  providers: [provideIcons({ radixEnter })],
})
export class LeaguesJoinComponent {
  leaguesStore = inject(LeaguesStore);
  playersStore = inject(PlayersStore);
  teamsStore = inject(TeamsStore);
  constructor(private dialog: MatDialog) {
    effect(() => {
      console.log(this.leaguesStore.leagues());
      console.log(this.playersStore.active_player());
    });
  }
  openJoinLeagueDialog(league_id: number) {
    const dialogRef = this.dialog.open(JoinTeamDialogComponent, {
      data: { teams: this.teamsStore.teams() },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      if (!this.playersStore.active_player()) return;

      this.leaguesStore.joinLeague({
        league_id: league_id,
        team_id: +result.team_id,
        player_id: this.playersStore.active_player()!.id,
      });
    });
  }
}
