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
import { TeamsListComponent } from '@f1-predictions/teams-list';
import { MatDialogModule } from '@angular/material/dialog';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { PlayersStore } from '@f1-predictions/players-store';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { LeaguePlayersListComponent } from '@f1-predictions/league-players-list';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { TeamsStore } from '@f1-predictions/teams-store';
import { DataSource } from '@angular/cdk/collections';
const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];
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
    TeamsListComponent,
    CountdownComponent,
    LeaguePlayersListComponent,
    LeaguesAddComponent,
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
  readonly players = inject(PlayersStore);
  readonly leagues = inject(LeaguesStore);
  readonly teams = inject(TeamsStore);
  active_race = this.races.active_race;
  dates = computed(() => {
    console.log('Computing Races');
    const dates = [];
    if (this.active_race()) {
      for (let key in this.active_race()) {
        if (this.isDateValid(this.active_race()![key])) {
          console.log(this.isDateValid(this.active_race()![key]));
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

  countDown: Signal<CountdownConfig> = computed(() => {
    let targetDate;
    if (this.active_race()) {
      targetDate = new Date(this.active_race()!.quali_time);
    } else {
      const currentDate = new Date();
      const threeDaysFromNow = new Date(currentDate);
      threeDaysFromNow.setDate(currentDate.getDate() + 3);
      targetDate = threeDaysFromNow;
    }

    return {
      leftTime: Math.max(
        0,
        Math.floor((targetDate.getTime() - new Date().getTime()) / 1000)
      ),
      format: 'DD HH:mm:ss',
      formatDate: ({ date, formatStr }: any) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(
              new RegExp(`${name}+`, 'g'),
              (match: string) => {
                // When days is empty
                if (name === 'D' && v <= 0) {
                  return '';
                }
                return v.toString().padStart(match.length, '0');
              }
            );
          }
          return current;
        }, formatStr);
      },
      prettyText: (text: string) => {
        const splitDaysandTime = text.split(' ');
        const splitTime = splitDaysandTime[1].split(':');
        return `<div class="flex gap-2 w-full">
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#B1B1EC] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute pt-3 text-xs text-white font-lemonada font-medium"
              >${splitDaysandTime[0]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white">Days</p>
        </div> 
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#B1B1EC] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute pt-3 text-xs text-white font-lemonada font-medium"
              >${splitTime[0]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white">Hrs</p>
        </div>
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#B1B1EC] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute pt-3 text-xs text-white font-lemonada font-medium"
              >${splitTime[1]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white">Mins</p>
        </div>
        <div class="grow">
          <i
            class="bi bi-calendar-fill text-[#B1B1EC] text-3xl relative inline-flex justify-center items-center"
            ><span
              class="absolute pt-3 text-xs text-white font-lemonada font-medium"
              >${splitTime[2]}</span
            ></i
          >
          <p class="font-lemonada text-2xs text-center text-white">Secs</p>
        </div>
      </div>`;
      },
    };
  });

  constructor() {
    effect(
      () => {
        if (this.players.active_player()) {
          this.players.loadAllLeaguesPerPlayer(
            this.players.active_player()!.id
          );
          this.teams.loadTeamsByPlayer(this.players.active_player()!.id);
        }
        if (this.leagues.players()) {
          console.log(this.leagues.players());
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
  toggleLeaguesList() {
    this.detailedLeague = !this.detailedLeague;
    this.toggleLeaguesListIcon = this.detailedLeague
      ? 'radixEnter'
      : 'radixArrowLeft';
    console.log(this.toggleLeaguesListIcon);
  }
  refresh() {
    this.races.loadAll();
  }
}
