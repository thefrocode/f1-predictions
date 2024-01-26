import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersStore } from '@f1-predictions/players-store';
import { TeamsStore } from '@f1-predictions/teams-store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from '@f1-predictions/create-team-dialog';

@Component({
  selector: 'teams-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css'],
})
export class TeamsListComponent {
  playersStore: any = inject(PlayersStore);
  teamsStore: any = inject(TeamsStore);

  constructor(public dialog: MatDialog) {
    effect(() => {
      if (this.playersStore.active_player()) {
        //console.log(this.playersStore.active_player());
        //this.teamsStore.loadTeamsByPlayer(this.playersStore.active_player().id);
        //console.log(this.teamsStore.teams());
      }
    });
  }
  ngOnInit(): void {
    if (this.playersStore.active_player()) {
      this.teamsStore.loadTeamsByPlayer(this.playersStore.active_player().id);
    }
  }
  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      if (!this.playersStore.active_player().id) return;

      this.teamsStore.createTeam({
        name: result.name,
        player_id: this.playersStore.active_player().id,
      });
    });
  }
}
