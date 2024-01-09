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
import { radixBell, radixMargin } from '@ng-icons/radix-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { RacesStore } from '@f1-predictions/race-store';
import { LeaguesListComponent } from '@f1-predictions/leagues-list';
import { TeamsListComponent } from '@f1-predictions/teams-list';
import { MatDialogModule } from '@angular/material/dialog';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
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
  providers: [provideIcons({ radixMargin, radixBell })],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly store = inject(RacesStore);
  active_race = this.store.active_race;
  targetDate!: Date; // Set your target date here
  config!: CountdownConfig;

  constructor() {
    effect(() => {
      if (this.store.active_race()) {
        this.targetDate = new Date(this.store.active_race().race_time);
        this.config = {
          stopTime: +new Date(this.targetDate),
          format: 'DD HH:mm:ss',
          prettyText: (text) => {
            return text
              .split(':')
              .map((v) => `<span class="item">${v}</span>`)
              .join('');
          },
        };
      }
    });
  }
}
