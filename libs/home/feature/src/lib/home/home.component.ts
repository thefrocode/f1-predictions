import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesStore } from '@f1-predictions/race-store';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayersStore } from '@f1-predictions/players-store';
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
import { PredictionsStore } from '@f1-predictions/predictions-store';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap, tap } from 'rxjs';

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
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly races = inject(RacesStore);
  authStore = inject(AuthStore);

  predictionsStore = inject(PredictionsStore);

  readonly players = inject(PlayersStore);

  home_leagues = computed(() => [...this.leagues.leagues()].splice(0, 4));
  readonly leagues = inject(LeaguesStore);
  league_players = inject(LeaguePlayersStore);

  active_race = this.races.active_race;
  active_player = this.players.active_player;

  active_player_league$ = toObservable(this.players.active_player)
    .pipe(
      takeUntilDestroyed(),
      tap((active_player) => {
        if (active_player) {
          console.log('active_player', active_player);
          this.league_players.selectLeague(
            active_player.selected_league_id,
            ''
          );
        } else {
          console.log('active_player', active_player);
          //this.leagues.loadOne(1);
        }
      })
    )
    .subscribe();

  dates = computed(() => {
    const dates = [];
    if (this.active_race()) {
      for (let key in this.active_race()) {
        if (this.isDateValid(this.active_race()![key])) {
          dates.push({
            session: key.split('_')[0],
            session_time: this.active_race()![key] as Date,
          });
        }
      }
    }
    return dates;
  });

  detailedLeague = true;
  toggleLeaguesListIcon = 'radixEnter';
  isDateValid(dateString: string | Date | boolean): boolean {
    if (
      typeof dateString === 'string' &&
      dateString.charAt(dateString.length - 1) === 'Z'
    ) {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    }
    return false;
  }

  constructor() {
    effect(
      () => {
        if (this.authStore.isAuthenticated()) {
          this.players.loadActivePlayer();
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
  ngOnInit() {
    this.leagues.loadAll({
      page: 1,
      filter: '',
    });
    this.races.loadAll();
    this.league_players.selectLeague(1, '');
  }

  toggleLeaguesList() {
    this.detailedLeague = !this.detailedLeague;
    this.toggleLeaguesListIcon = this.detailedLeague
      ? 'radixEnter'
      : 'radixArrowLeft';
  }
}
