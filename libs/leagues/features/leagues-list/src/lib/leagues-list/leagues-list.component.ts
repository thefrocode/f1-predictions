import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { TeamsStore } from '@f1-predictions/teams-store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddLeagueDialogComponent } from '@f1-predictions/add-league-dialog';
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
  constructor(private dialog: MatDialog) {
    effect(() => {
      console.log(this.leaguesStore.leagues());
      console.log(this.playersStore.active_player());
    });
  }
  openCreateLeagueDialog() {
    const dialogRef = this.dialog.open(AddLeagueDialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      console.log(result);
      this.leaguesStore.createLeague({
        name: result.name,
        owner_id: this.playersStore.active_player().id,
      });
    });
  }
  openJoinLeagueDialog(league_id: number) {
    console.log(this.teamsStore.teams());
    const dialogRef = this.dialog.open(JoinTeamDialogComponent, {
      data: { teams: this.teamsStore.teams() },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      console.log(result);
      this.leaguesStore.joinLeague({
        league_id: league_id,
        team_id: +result.team_id,
        player_id: this.playersStore.active_player().id,
      });
    });
  }
}
