import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AuthUser, LoginPayload, RecipeOverview } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authBase = '/api/v1/auth';
  private readonly profileBase = '/api/v1/profile';

  currentUser = signal<AuthUser | null>(null);

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.authBase}/login`, payload).pipe(
      tap(user => this.currentUser.set(user))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.authBase}/logout`, {}).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.router.navigate(['/']);
      })
    );
  }

  fetchOverview(): Observable<RecipeOverview> {
    return this.http.get<RecipeOverview>(`${this.profileBase}/summary`);
  }

  restoreSession(): Promise<void> {
    return firstValueFrom(
      this.http.get<AuthUser>(`${this.authBase}/status`).pipe(
        tap(user => this.currentUser.set(user)),
        map(() => void 0),
        catchError(() => {
          this.currentUser.set(null);
          return of(void 0);
        })
      )
    );
  }
}
