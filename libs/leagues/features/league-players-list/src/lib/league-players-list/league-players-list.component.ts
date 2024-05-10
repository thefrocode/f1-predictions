import {
  Component,
  computed,
  effect,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { TeamStore } from '@f1-predictions/predictions-store';
@Component({
  selector: 'league-players-list',
  standalone: true,
  imports: [CommonModule, LeaguesAddComponent],
  templateUrl: './league-players-list.component.html',
  styleUrls: ['./league-players-list.component.css'],
  providers: [],
})
export class LeaguePlayersListComponent {
  teamsStore = inject(TeamStore);
  active_player = inject(PlayersStore).active_player;

  displayed_league = inject(LeaguesStore).display_league;
  selected_team = this.teamsStore.selected_team;

  @ViewChildren('details') details!: QueryList<any>;
  constructor() {
    effect(() => {
      console.log(this.displayed_league());
    });
  }
  loadOneTeam(selectedDetail: HTMLElement, player_id: number) {
    this.details.forEach((detail) => {
      if (detail.nativeElement !== selectedDetail) {
        detail.nativeElement.removeAttribute('open');
      }
    });
    return this.teamsStore.loadOne(player_id);
  }
}
