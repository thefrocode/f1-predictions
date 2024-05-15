import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';
import { ActivePlayerStore } from '@f1-predictions/players-store';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'f1-predictions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'f1-predictions';
  auth = inject(AuthStore);
  active_player = inject(ActivePlayerStore);
  ngOnInit() {
    //this.auth.loginAutomatically();
  }
  constructor() {
    this.active_player.loadActivePlayer(this.auth.isAuthenticated);
  }
}
