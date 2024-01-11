import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
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
} from '@ng-icons/radix-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { RacesStore } from '@f1-predictions/race-store';
import { LeaguesListComponent } from '@f1-predictions/leagues-list';
import { TeamsListComponent } from '@f1-predictions/teams-list';
import { MatDialogModule } from '@angular/material/dialog';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { PlayersStore } from '@f1-predictions/players-store';
import { LeaguesStore } from '@f1-predictions/leagues-store';
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
  ],
  providers: [provideIcons({ radixMargin, radixBell, radixPlus, radixEnter })],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly store = inject(RacesStore);
  readonly players = inject(PlayersStore);
  readonly leagues = inject(LeaguesStore);
  active_race = this.store.active_race;
  targetDate!: Date; // Set your target date here
  leftTime: number = 0;
  config!: CountdownConfig;

  constructor() {
    effect(
      () => {
        if (this.store.active_race()) {
          this.targetDate = new Date(this.store.active_race().race_time);
          this.leftTime = Math.max(
            0,
            Math.floor(
              (this.targetDate.getTime() - new Date().getTime()) / 1000
            )
          );
          this.config = {
            leftTime: this.leftTime,
            format: 'DD HH:mm:ss',
            formatDate: ({ date, formatStr }) => {
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
            prettyText: (text) => {
              const splitDaysandTime = text.split(' ');
              const splitTime = splitDaysandTime[1].split(':');
              return `<span class="flex flex-row gap-2">
              <div>
                <p class="font-bold text-2xl">${splitDaysandTime[0]}</p>
                <p>Days</p>
              </div>
              <p class="align-self-center font-bold text-2xl">:</p>
              <div>
                <p class="font-bold text-2xl">${splitTime[0]}</p>
                <p>Hrs</p>
              </div>
              <p class="font-bold text-2xl">:</p>
              <div>
                <p class="font-bold text-2xl">${splitTime[1]}</p>
                <p>Mins</p>
              </div>
              <p class="font-bold text-2xl">:</p>
              <div>
                <p class="font-bold text-2xl">${splitTime[2]}</p>
                <p>Secs</p>
              </div>
            </span>`;
            },
          };
        }
        if (this.players.active_player()) {
          this.players.loadAllLeaguesPerPlayer(this.players.active_player().id);
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
  fetchPlayersByLeagueId(league_id: any) {
    this.leagues.loadAllPlayersPerLeague(league_id.value);
  }
}
