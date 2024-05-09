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
import { LeaguesAddComponent } from '@f1-predictions/leagues-add';
@Component({
  selector: 'leagues-list',
  standalone: true,
  imports: [CommonModule, LeaguesAddComponent],
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.css'],
})
export class LeaguesListComponent {
  leagues = inject(LeaguesStore);
  selected_league_id = signal(0);
  selected_league = computed(() => {
    return this.leagues.league_players()[this.selected_league_id()];
  });
  constructor() {
    // effect(() => {
    //   console.log('leagues', this.selected_league());
    // });
  }
  ngOnInit() {
    this.leagues.loadAll();
    this.loadOneLeague(1);
  }
  loadOneLeague(league_id: number) {
    this.selected_league_id.set(league_id);
    this.leagues.loadOne(league_id);
  }
}
