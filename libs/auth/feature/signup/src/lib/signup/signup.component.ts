import { Component, effect, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchesValidator, showErrors } from '@f1-predictions/utils';
import { AuthStore } from '@f1-predictions/auth-store';
import { Router, RouterModule } from '@angular/router';
import { APP_CONFIG, AppConfig } from '@f1-predictions/app-config';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'f1-predictions-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fb = inject(FormBuilder);

  authStore = inject(AuthStore);

  signUpForm: FormGroup = this.fb.group(
    {
      name: ['Christine', [Validators.required]],
      email: ['christine@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['123456', Validators.required],
    },
    {
      validators: [passwordMatchesValidator],
    }
  );
  constructor(
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    effect(() => {
      if (this.authStore.status() === 'registered') {
        this.router.navigate(['login']);
      }
    });
  }

  get f() {
    return this.signUpForm.controls;
  }
  signUp() {
    showErrors(this.signUpForm);
    if (this.signUpForm.invalid) return;

    this.authStore.signup(this.signUpForm.value);
  }
  signupWithGoogle(): void {
    window.location.href = `${this.appConfig.baseURL}/auth/google`;
  }
}
