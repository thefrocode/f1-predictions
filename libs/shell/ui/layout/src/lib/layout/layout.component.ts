import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';

@Component({
  selector: 'f1-predictions-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [],
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
