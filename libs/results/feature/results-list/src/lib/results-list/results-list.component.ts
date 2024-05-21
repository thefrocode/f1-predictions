import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsStore } from '@f1-predictions/results-store';

@Component({
  selector: 'f1-predictions-results-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})
export class ResultsListComponent {
  resultsStore = inject(ResultsStore);
  results = this.resultsStore.results;

  constructor() {
    effect(() => {
      console.log('Results', this.resultsStore.results());
    });
  }
  // ngOnInit(): void {
  //   this.resultsStore.loadAll();
  // }
}
