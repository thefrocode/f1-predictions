import { Component, effect, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@f1-predictions/auth-store';
import { AuthApiService } from '@f1-predictions/f1-predictions-api';
import { AppConfig, APP_CONFIG } from '@f1-predictions/app-config';

@Component({
  selector: 'f1-predictions-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any;

  authStore = inject(AuthStore);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private authService: AuthApiService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    effect(() => {
      if (this.authStore.user()) {
        this.router.navigate(['home']);
      }
      console.log(this.authStore.error());
    });
  }

  login(): void {
    this.authStore.login(this.loginForm.value);
  }
  loginWithGoogle(): void {
    window.location.href = `${this.appConfig.baseURL}/auth/google`;
  }
}
