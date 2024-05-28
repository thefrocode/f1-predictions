import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguePlayersStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { TeamStore } from '@f1-predictions/predictions-store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlayerWithPoints } from '@f1-predictions/models';
import { ReplaceUnderscorePipe } from '@f1-predictions/utils';
@Component({
  selector: 'league-players-list',
  standalone: true,
  imports: [
    CommonModule,
    LeaguesAddComponent,
    ReactiveFormsModule,
    ReplaceUnderscorePipe,
  ],
  templateUrl: './league-players-list.component.html',
  styleUrls: ['./league-players-list.component.css'],
  providers: [],
})
export class LeaguePlayersListComponent {
  teamsStore = inject(TeamStore);

  league_players = inject(LeaguePlayersStore);
  active_player = inject(PlayersStore).active_player;

  selected_team = this.teamsStore.selected_team;

  selectedPlayer: PlayerWithPoints | undefined = undefined;

  filterControl = new FormControl('');

  loadOneTeam(player: PlayerWithPoints) {
    this.selectedPlayer = player;
    return this.teamsStore.loadOne(player.player_id);
  }
  goBack() {
    this.selectedPlayer = undefined;
    this.teamsStore.removeSelectedPlayer();
  }
}
