import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { AuthStore } from '@f1-predictions/auth-store';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { LeaguePlayersListComponent } from '@f1-predictions/league-players-list';
@Component({
  selector: 'leagues-list',
  standalone: true,
  imports: [CommonModule, LeaguesAddComponent, LeaguePlayersListComponent],
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.css'],
})
export class LeaguesListComponent {
  leagues = inject(LeaguesStore);
  auth = inject(AuthStore);
  ngOnInit() {
    this.leagues.loadAll();
    this.loadOneLeague(1);
  }
  loadOneLeague(league_id: number) {
    this.leagues.loadOne(league_id);
  }
  constructor() {
    effect(() => {
      console.log(this.leagues.leagues());
    });
  }
}
