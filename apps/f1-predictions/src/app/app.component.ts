import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';
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
  ngOnInit() {
    this.auth.loginAutomatically();
  }
}
