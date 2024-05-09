import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DriversStore,
  PredictionTypesStore,
  TeamStore,
} from '@f1-predictions/predictions-store';
import { Team } from '@f1-predictions/models';
import { PlayersStore } from '@f1-predictions/players-store';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
  active_player = inject(PlayersStore).active_player;
  active_player_team$ = toObservable(this.active_player)
    .pipe(
      takeUntilDestroyed(),
      tap((active_player) => {
        if (active_player) {
          return this.teams.loadOne(active_player.id);
        } else {
          return {};
        }
      })
    )
    .subscribe();

  selected_team = computed(() => {
    const team: {
      [key: string]: string | undefined;
    } = {};
    console.log(this.teams.teams(), this.teams.selected_team());
    if (!this.teams.selected_team()) return team;

    this.teams.selected_team()!.team.forEach((t) => {
      team[t.prediction_type] = t.driver_name;
    });
    console.log(team);
    return team;
  });
  drivers = inject(DriversStore).drivers;

  driver_selection = computed(() => {
    //const selected_position = this.teams.teams().map((t) => t.driver_id);
    const drivers = this.drivers().map((d) => {
      Object.keys(this.selected_team()).forEach((key) => {
        const prediction_type = this.prediction_types().find(
          (p) => p.name === key
        )!;

        if (
          prediction_type.type === 'Positional' &&
          d.name === this.selected_team()[key]
        ) {
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

  constructor() {}
  saveTeam() {
    const team: Team[] = [];
    Object.keys(this.selected_team()).forEach((key) => {
      const prediction_type = this.prediction_types().find(
        (p) => p.name === key
      )!;

      team.push({
        prediction_type_id: prediction_type.id,
        driver_id: this.drivers().find(
          (d) => d.name === this.selected_team()[key]
        )?.id,
        driver_name: this.selected_team()[key],
        prediction_type: prediction_type.name,
        player_id: this.active_player()!.id,
      });
    });
    console.log(team);
    this.teams.updateTeam(team);
  }
}
