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
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '@f1-predictions/app-config';

@Component({
  selector: 'f1-predictions-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fb = inject(FormBuilder);

  authStore = inject(AuthStore);

  signUpForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
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
      console.log(this.authStore.error());
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
