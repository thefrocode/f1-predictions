import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'f1-predictions-signin',
  standalone: true,
  imports: [CommonModule, SocialLoginModule, GoogleSigninButtonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  user: any;

  constructor(private authService: SocialAuthService) {}
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  signIn(): void {
    //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  refreshToken(): void {
    //this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
