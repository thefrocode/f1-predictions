import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { PlayersStore } from '@f1-predictions/players-store';

@Component({
  selector: 'league-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './league-settings.component.html',
  styleUrls: ['./league-settings.component.css'],
})
export class LeagueSettingsComponent {
  readonly leagues = inject(LeaguesStore);
  readonly players = inject(PlayersStore);
  selectedLeagueForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.leagues.loadSelectedLeague();
    effect(() => {
      console.log(this.leagues.leagues());
      console.log(this.leagues.selected_league());
      if (this.leagues.selected_league()) {
        this.selectedLeagueForm.patchValue({
          selected_league: this.leagues.selected_league().league_id,
        });
      }
    });
  }

  ngOnInit() {
    this.selectedLeagueForm = this.fb.group({
      selected_league: [, Validators.required],
    });
  }
  selectLeague() {
    if (this.players.active_player()) {
      this.leagues.selectLeague({
        id: this.leagues.selected_league().id,
        league_id: this.selectedLeagueForm.value['selected_league'],
        player_id: this.players.active_player()!.id,
      });
    }
  }
}
