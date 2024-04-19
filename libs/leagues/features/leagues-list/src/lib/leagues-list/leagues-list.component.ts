import { Component, effect, inject } from '@angular/core';
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
  ngOnInit() {
    this.leagues.loadAll();
  }
}
