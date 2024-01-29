import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { TeamsStore } from '@f1-predictions/teams-store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JoinTeamDialogComponent } from '@f1-predictions/join-team-dialog';

@Component({
  selector: 'leagues-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.css'],
})
export class LeaguesListComponent {
  leaguesStore = inject(LeaguesStore);
  playersStore = inject(PlayersStore);
  teamsStore = inject(TeamsStore);
  activePlayerLeagues!: Set<number>;
  constructor(private dialog: MatDialog) {
    effect(() => {
      this.activePlayerLeagues = new Set<number>(
        this.playersStore.active_player_leagues()
      );
      console.log(this.activePlayerLeagues);
      console.log(this.teamsStore.teams());
      console.log(this.playersStore.leagues());
      console.log(this.leaguesStore.leagues());
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
