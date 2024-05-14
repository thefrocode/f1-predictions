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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  of,
  startWith,
  switchMap,
} from 'rxjs';
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
  auth = inject(AuthStore);

  filterControl = new FormControl('');
  filter$ = this.filterControl.valueChanges;
  page$ = new BehaviorSubject<number>(1);
  ngOnInit() {
    this.loadOneLeague(1);
  }

  loadOneLeague(league_id: number) {
    this.leagues.loadOne(league_id);
  }
  constructor() {
    effect(() => {
      console.log(this.leagues.leagues());
    });
    combineLatest([
      this.page$.asObservable().pipe(startWith(1)),
      this.filter$.pipe(startWith('')),
    ])
      .pipe(
        takeUntilDestroyed(),
        switchMap(([page, filter]) => {
          this.leagues.loadAll({
            page,
            filter,
          });
          return of(null);
        })
      )
      .subscribe();
  }
}
