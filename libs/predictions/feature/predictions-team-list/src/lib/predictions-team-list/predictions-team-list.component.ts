import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DriversStore,
  PredictionTypesStore,
  TeamStore,
} from '@f1-predictions/predictions-store';

interface Team {
  [key: string]: string;
}
@Component({
  selector: 'predictions-team-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './predictions-team-list.component.html',
  styleUrls: ['./predictions-team-list.component.css'],
})
export class PredictionsTeamListComponent {
  prediction_types = inject(PredictionTypesStore).prediction_types;
  teams = inject(TeamStore);

  selected_team = computed(() => {
    const team: {
      [key: string]: string;
    } = {};
    this.teams.teams().forEach((t) => {
      team[t.prediction_type] = t.driver_name;
    });
    return team;
  });
  drivers = inject(DriversStore).drivers;

  driver_selection = computed(() => {
    //const selected_position = this.teams.teams().map((t) => t.driver_id);
    const drivers = this.drivers().map((d) => {
      Object.keys(this.selected_team()).forEach((key) => {
        if (d.name === this.selected_team()[key]) {
          d.selected = true;
        }
      });
      return d;
    });
    return drivers.map((d) => {
      if (!d.selected) {
        d.selected = false;
      }
      return {
        ...d,
        points: 100,
      };
    });
  });

  selected_position!: {
    name: string;
    type: string;
  } | null;

  removeSelection(prediction: string, driver: string) {
    console.log(prediction);
    const prediction_type = this.prediction_types().find(
      (p) => p.name === prediction
    )!;
    console.log(this.selected_team()[prediction], driver);
    if (
      prediction_type.type === 'Positional' &&
      this.selected_team()[prediction] === driver
    ) {
      const selectedDriver = this.driver_selection().find(
        (d) => d.name === driver
      )!;
      selectedDriver.selected = false;
    }
    this.selected_team()[prediction] = '';
  }
  addSelection(driver: string) {
    if (!this.selected_position) return;
    this.selected_team()[this.selected_position!.name] = driver;

    if (this.selected_position!.type === 'Positional') {
      const selectedDriver = this.driver_selection().find(
        (d) => d.name === driver
      )!;
      selectedDriver.selected = true;
    }
    this.selected_position = null;
  }
  setSelectionPrediction(position: string) {
    this.selected_position = this.prediction_types().find(
      (p) => p.name === position
    )!;
  }
  ngOnInit() {
    console.log(this.prediction_types());
  }
  constructor() {
    effect(() => console.log(this.selected_team()));
  }
}
