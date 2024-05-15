import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaguesStore } from '@f1-predictions/leagues-store';
import { ActivePlayerStore, PlayersStore } from '@f1-predictions/players-store';

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
  readonly active_player = inject(ActivePlayerStore);
  selectedLeagueForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      console.log('Active Player', this.active_player.player());
      if (this.active_player.player()) {
        this.selectedLeagueForm.patchValue({
          selected_league: this.active_player.player()?.selected_league_id,
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
    this.leagues.selectLeague(this.selectedLeagueForm.value['selected_league']);
  }
}
