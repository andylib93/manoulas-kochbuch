import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { AuthService } from '../auth/auth.service';
import { RecipeOverview } from '../auth/auth.model';

@Component({
  selector: 'app-profile',
  imports: [Nav, Footer, RouterLink],
  template: `
    <app-nav></app-nav>
    <main>
      <section class="card">
        @if (user()) {
          <h1>Hallo {{ user()!.username }}</h1>
        } @else {
          <h1 class="skeleton-line skeleton-title" aria-hidden="true"></h1>
        }

        <div class="actions">
          <a routerLink="/recipes/new" class="btn btn-primary">+ Neues Rezept</a>
          <button type="button" class="btn" (click)="logout()">Logout</button>
        </div>
      </section>

      <section class="card">
        <h2>Deine Rezepte</h2>
        <br>
        @if (loading() && !overview()) {
          <div class="overview-skeleton" aria-hidden="true">
            <div class="skeleton-line skeleton-meta"></div>
            @for (_ of overviewSkeletonRows; track $index) {
              <div class="skeleton-row"></div>
            }
          </div>
        } @else if (overview()) {
          <p><strong>Gesamt:</strong> {{ overview()!.totalRecipes }}</p>
          <ul>
            @for (entry of categoryEntries(); track entry.key) {
              <li>{{ entry.key }}: {{ entry.value }}</li>
            }
          </ul>
        } @else {
          <p class="error">{{ error() || 'Übersicht konnte nicht geladen werden.' }}</p>
        }
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    main {
      max-width: 760px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
      min-height: 36rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--bg, #fff);
    }
    .actions {
      margin-top: 1rem;
      display: flex;
      gap: 0.75rem;
    }
    .btn {
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      padding: 0.45rem 0.9rem;
      background: transparent;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      font-size: 0.95rem;
    }
    .btn-primary {
      border: none;
      background: var(--blue);
      color: #fff;
    }
    .error { color: #e53e3e; }
    ul { margin: 0.5rem 0 0; padding-left: 1.2rem; }
    .skeleton-line {
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.12), rgba(0,0,0,.06));
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
    }
    .skeleton-title {
      width: 10rem;
      height: 1.8rem;
      margin: 0;
    }
    .overview-skeleton {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .skeleton-meta {
      width: 6rem;
      height: 0.8rem;
    }
    .skeleton-row {
      height: 0.95rem;
      width: 70%;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.12), rgba(0,0,0,.06));
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
    }
    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
  `
})
export class Profile {
  private readonly authService = inject(AuthService);

  user = this.authService.currentUser;
  readonly overviewSkeletonRows = Array.from({ length: 4 });
  loading = signal(true);
  error = signal<string | null>(null);
  overview = signal<RecipeOverview | null>(null);

  constructor() {
    this.authService.fetchOverview().subscribe({
      next: data => {
        this.overview.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Fehler beim Laden der Übersicht.');
        this.loading.set(false);
      }
    });
  }

  categoryEntries(): Array<{ key: string; value: number }> {
    const categories = this.overview()?.categories ?? {};
    return Object.entries(categories).map(([key, value]) => ({ key, value }));
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
