import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { provideIcons } from '@ng-icons/core';
import { radixPlus, radixEnter } from '@ng-icons/radix-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
@Component({
  selector: 'league-players-list',
  standalone: true,
  imports: [CommonModule, HlmIconComponent, LeaguesAddComponent],
  templateUrl: './league-players-list.component.html',
  styleUrls: ['./league-players-list.component.css'],
  providers: [provideIcons({ radixPlus, radixEnter })],
})
export class LeaguePlayersListComponent {
  readonly leagues: any = inject(LeaguesStore);
  readonly players: any = inject(PlayersStore);

  fetchPlayersByLeagueId(league_id: any) {
    this.leagues.loadAllPlayersPerLeague(league_id.value);
  }
}
