import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from '@f1-predictions/auth-store';

@Component({
  selector: 'f1-predictions-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent {
  auth = inject(AuthStore);
  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.auth.loginWithGoogle();
    this.router.navigate(['/home']);
  }
}
