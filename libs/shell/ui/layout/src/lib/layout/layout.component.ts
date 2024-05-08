import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  radixHome,
  radixMargin,
  radixPerson,
  radixChatBubble,
  radixGear,
} from '@ng-icons/radix-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { AuthStore } from '@f1-predictions/auth-store';

@Component({
  selector: 'f1-predictions-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HlmIconComponent],
  providers: [
    provideIcons({
      radixMargin,
      radixHome,
      radixPerson,
      radixChatBubble,
      radixGear,
    }),
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isDropdownOpen: boolean = false;
  authStore = inject(AuthStore);
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
