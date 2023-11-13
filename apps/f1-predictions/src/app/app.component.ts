import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HlmButtonDirective],
  selector: 'f1-predictions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'f1-predictions';
}
