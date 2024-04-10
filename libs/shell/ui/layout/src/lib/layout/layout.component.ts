import { Component } from '@angular/core';
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
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
