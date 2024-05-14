import {
  Component,
  inject,
  Input,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LeaguePlayersStore,
  LeaguesStore,
} from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
import { TeamStore } from '@f1-predictions/predictions-store';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, of, startWith, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'league-players-list',
  standalone: true,
  imports: [CommonModule, LeaguesAddComponent, ReactiveFormsModule],
  templateUrl: './league-players-list.component.html',
  styleUrls: ['./league-players-list.component.css'],
  providers: [],
})
export class LeaguePlayersListComponent {
  teamsStore = inject(TeamStore);

  league_players = inject(LeaguePlayersStore);
  active_player = inject(PlayersStore).active_player;

  selected_league$ = toObservable(this.league_players.selected_league);

  selected_team = this.teamsStore.selected_team;

  filterControl = new FormControl('');
  filter$ = this.filterControl.valueChanges;
  page$ = new BehaviorSubject<number>(1);

  @ViewChildren('details') details!: QueryList<any>;

  loadOneTeam(selectedDetail: HTMLElement, player_id: number) {
    this.details.forEach((detail) => {
      if (detail.nativeElement !== selectedDetail) {
        detail.nativeElement.removeAttribute('open');
      }
    });
    return this.teamsStore.loadOne(player_id);
  }
  constructor() {
    combineLatest([
      this.page$.asObservable().pipe(startWith(1)),
      this.filter$.pipe(startWith('')),
      this.selected_league$,
    ])
      .pipe(
        takeUntilDestroyed(),
        switchMap(([page, filter, league]) => {
          this.league_players.loadLeaguePlayers({
            league_id: league.id,
            page,
            filter,
          });
          return of(null);
        })
      )
      .subscribe();
  }
}
