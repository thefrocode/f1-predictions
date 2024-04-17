import { Component, inject } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.selectedLeagueForm = this.fb.group({
      selected_league: [, Validators.required],
    });
  }
  selectLeague() {
    if (this.players.active_player()) {
      this.leagues.selectLeague({
        id: 1,
        league_id: this.selectedLeagueForm.value['selected_league'],
        player_id: this.players.active_player()!.id,
      });
    }
  }
}
