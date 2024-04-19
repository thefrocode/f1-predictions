import { Component, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { radixEnter } from '@ng-icons/radix-icons';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { TeamsStore } from '@f1-predictions/teams-store';
import { MatDialog } from '@angular/material/dialog';

import { JoinTeamDialogComponent } from '@f1-predictions/join-team-dialog';
import { League } from '@f1-predictions/models';

@Component({
  selector: 'leagues-join',
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

  @Input({
    required: true,
  })
  league!: League;

  constructor(private dialog: MatDialog) {
    effect(() => {
      console.log(this.leaguesStore.leagues());
      console.log(this.playersStore.active_player());
    });
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
