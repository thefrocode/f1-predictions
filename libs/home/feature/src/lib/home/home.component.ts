import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import {
  radixBell,
  radixMargin,
  radixPlus,
  radixEnter,
  radixArrowLeft,
  radixCalendar,
} from '@ng-icons/radix-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { RacesStore } from '@f1-predictions/race-store';
import { LeaguesListComponent } from '@f1-predictions/leagues-list';
import { MatDialogModule } from '@angular/material/dialog';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { PlayersStore } from '@f1-predictions/players-store';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { LeaguePlayersListComponent } from '@f1-predictions/league-players-list';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { LeaguesJoinComponent } from '@f1-predictions/leagues-join';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';
import { HomeTeamlockDeadlineComponent } from '@f1-predictions/home-teamlock-deadline';
import { PredictionsStore } from '@f1-predictions/predictions-store';

@Component({
  selector: 'f1-predictions-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
    HlmIconComponent,
    LeaguesListComponent,
    CountdownComponent,
    LeaguePlayersListComponent,
    LeaguesAddComponent,
    LeaguesJoinComponent,
    RouterModule,
    HomeTeamlockDeadlineComponent,
  ],
  providers: [
    provideIcons({
      radixMargin,
      radixBell,
      radixPlus,
      radixEnter,
      radixArrowLeft,
      radixCalendar,
    }),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly races = inject(RacesStore);
  authStore = inject(AuthStore);

  predictionsStore = inject(PredictionsStore);

  readonly players = inject(PlayersStore);

  home_leagues = computed(() => this.leagues.leagues().splice(0, 4));
  readonly leagues = inject(LeaguesStore);

  active_race = this.races.active_race;
  active_player = this.players.active_player;
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
        if (this.authStore.user()) {
          this.players.loadOne(this.authStore.user()!.user_id);
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
  ngOnInit() {
    this.leagues.loadAll();
    this.leagues.loadOne();
  }

  toggleLeaguesList() {
    this.detailedLeague = !this.detailedLeague;
    this.toggleLeaguesListIcon = this.detailedLeague
      ? 'radixEnter'
      : 'radixArrowLeft';
  }
  refresh() {
    this.races.loadAll();
  }
}
