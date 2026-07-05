import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {Nav} from "../nav/nav";
import {Footer} from "../footer/footer";

@Component({
  selector: 'app-login',
  imports: [Nav, Footer, FormsModule],
  template: `
    <app-nav></app-nav>
    <main>
      <form (ngSubmit)="submit()">
        <h1>Login</h1>

        <label>
          Benutzername
          <input [(ngModel)]="username" name="username" required autocomplete="username" />
        </label>

        <label>
          Passwort
          <input [(ngModel)]="password" name="password" type="password" required autocomplete="current-password" />
        </label>

        @if (error()) {
          <p class="error">{{ error() }}</p>
        }

        <button type="submit" [disabled]="submitting()">
          {{ submitting() ? 'Prüfe Login...' : 'Einloggen' }}
        </button>
      </form>
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    main {
      min-height: 70vh;
      display: grid;
      place-items: center;
      padding: 1.5rem;
    }
    form {
      width: min(28rem, 100%);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 0.75rem;
    }
    h1 { margin: 0 0 0.25rem; }
    label { display: flex; flex-direction: column; gap: 0.3rem; font-weight: 600; }
    input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      font-size: 1rem;
      color: var(--font);
      background: var(--bg);
    }
    button {
      margin-top: 0.25rem;
      padding: 0.6rem 1rem;
      border: none;
      border-radius: 0.4rem;
      background: var(--blue);
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
    }
    button:disabled { opacity: 0.6; cursor: default; }
    .error { color: #e53e3e; margin: 0; }
  `
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  username = '';
  password = '';
  error = signal<string | null>(null);
  submitting = signal(false);

  submit(): void {
    if (!this.username || !this.password) {
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/profile';
        this.router.navigateByUrl(redirectTo);
      },
      error: () => {
        this.error.set('Ungültige Zugangsdaten.');
        this.submitting.set(false);
      }
    });
  }
}
