import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesStore } from '@f1-predictions/race-store';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivePlayerStore, PlayersStore } from '@f1-predictions/players-store';
import {
  LeaguesStore,
  LeaguePlayersStore,
} from '@f1-predictions/leagues-store';
import { LeaguePlayersListComponent } from '@f1-predictions/league-players-list';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { LeaguesJoinComponent } from '@f1-predictions/leagues-join';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';
import { HomeTeamlockDeadlineComponent } from '@f1-predictions/home-teamlock-deadline';
import { ResultsStore } from '@f1-predictions/results-store';
import { HomeSessionTimesComponent } from '@f1-predictions/home-session-times';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'f1-predictions-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    LeaguePlayersListComponent,
    LeaguesAddComponent,
    LeaguesJoinComponent,
    RouterModule,
    HomeTeamlockDeadlineComponent,
    HomeSessionTimesComponent,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly racesStore = inject(RacesStore);
  authStore = inject(AuthStore);

  resultsStore = inject(ResultsStore);

  active_player = inject(ActivePlayerStore);

  readonly leagues = inject(LeaguesStore);
  home_leagues = computed(() => [...this.leagues.leagues()].splice(0, 5));
  league_players = inject(LeaguePlayersStore);

  active_race = this.racesStore.active_race;

  display_data = computed(() => {
    return (
      this.racesStore.races().length > 0 &&
      this.leagues.leagues().length > 0 &&
      this.resultsStore.last_race() &&
      this.league_players.players().length > 0
    );
  });
  constructor() {
    this.league_players.loadActivePlayerLeague(this.active_player.player);
    this.leagues.loadAll({ page: 1, filter: '' });
  }

  ngOnInit() {
    this.racesStore.loadAll();
  }
}
