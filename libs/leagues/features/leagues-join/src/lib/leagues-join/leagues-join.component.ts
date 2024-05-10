import { Component, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { radixEnter } from '@ng-icons/radix-icons';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { MatDialog } from '@angular/material/dialog';
import { JoinTeamDialogComponent } from '@f1-predictions/join-team-dialog';
import { League } from '@f1-predictions/models';

@Component({
  selector: 'leagues-join',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leagues-join.component.html',
  styleUrls: ['./leagues-join.component.css'],
  providers: [],
})
export class LeaguesJoinComponent {
  leaguesStore = inject(LeaguesStore);
  playersStore = inject(PlayersStore);

  @Input({
    required: true,
  })
  league!: League;

  constructor(private dialog: MatDialog) {
    // effect(() => {
    //   console.log(this.leaguesStore.leagues());
    //   console.log(this.playersStore.active_player());
    // });
  }
  openJoinLeagueDialog() {
    const dialogRef = this.dialog.open(JoinTeamDialogComponent, {
      data: { league_name: this.league.name },
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (!this.playersStore.active_player()) return;
      if (this.league === undefined) return;

      if (!result) return;

      await this.leaguesStore.joinLeague({
        league_id: this.league.id,
        player_id: this.playersStore.active_player()!.id,
      });
      this.leaguesStore.loadAll();
    });
  }
}
