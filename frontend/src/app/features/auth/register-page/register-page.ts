import { ChangeDetectionStrategy, Component, inject, signal } from
    '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  error = signal<string>('');

  form = this._fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    birthdate: ['', Validators.required],
    gender: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      await this._authService.register(this.form.value as any);
      this._router.navigate(['/auth/login']);
    } catch {
      this.error.set('Erreur lors de l\'inscription');
    }
  }
}
