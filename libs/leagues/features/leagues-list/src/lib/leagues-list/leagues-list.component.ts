import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LeaguePlayersStore,
  LeaguesStore,
} from '@f1-predictions/leagues-store';
import { AuthStore } from '@f1-predictions/auth-store';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { LeaguePlayersListComponent } from '@f1-predictions/league-players-list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'leagues-list',
  standalone: true,
  imports: [
    CommonModule,
    LeaguesAddComponent,
    LeaguePlayersListComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.css'],
})
export class LeaguesListComponent {
  leagues = inject(LeaguesStore);
  league_players = inject(LeaguePlayersStore);
  auth = inject(AuthStore);
  filterControl = new FormControl('');

  constructor() {
    this.league_players.selectLeague(1, '');
  }
}
