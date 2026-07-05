import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { CUISINES, flagOrCode } from './cuisine';

@Component({
  selector: 'app-recipe-detail',
  imports: [FormsModule, Nav, Footer],
  template: `
    <app-nav></app-nav>
    <main>
      <div class="toolbar">
        <a (click)="back()" class="back-link">
          <svg viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg" fill="var(--blue)">
              <path stroke-width="0" stroke-linecap="round" stroke-linejoin="round"
                  fill="var(--blue)" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z">
              </path>
          </svg>
          <span>Zurück</span>
        </a>
        @if (recipe() && !editing() && user()) {
          <div class="toolbar-actions">
            <button class="btn-edit" (click)="startEdit()">Bearbeiten</button>
          </div>
        }
      </div>

      @if (error()) { <p class="error">{{ error() }}</p> }

      @if (recipe()) {

        <!-- ANSICHT -->
        @if (!editing()) {
          <article class="view">
            <p class="meta">
              {{ recipe()!.category }}
              @if (recipe()!.cuisine) {
                <span class="flag" [title]="cuisineLabel(recipe()!.cuisine)">{{ flag(recipe()!.cuisine) }}</span>
              }
              @if (recipe()!.vegetarian) {
                <span class="veg-label">🌱</span>
              }
            </p>
            <h1>{{ recipe()!.name }}</h1>

            @if (recipe()!.ingredients.length) {
              <section>
                <h2>Zutaten</h2>
                <ul class="ingredient-list">
                  @for (ing of recipe()!.ingredients; track $index) {
                    <li><span class="amount">{{ ing.amount }}</span> {{ ing.name }}</li>
                  }
                </ul>
              </section>
            }

            @if (recipe()!.instructions) {
              <section>
                <h2>Zubereitung</h2>
                <p class="instructions">{{ recipe()!.instructions }}</p>
              </section>
            }
          </article>
        }

        <!-- BEARBEITEN -->
        @if (editing()) {
          <form class="edit-form" (submit)="save()">
            <label>Name<input [(ngModel)]="draft()!.name" name="name" required /></label>
            <div class="row">
              <label>Kategorie
                <select [(ngModel)]="draft()!.category" name="category">
                  <option value="">– wählen –</option>
                  @for (c of categories; track c) { <option>{{ c }}</option> }
                </select>
              </label>
              <label>Küche
                <select [(ngModel)]="draft()!.cuisine" name="cuisine">
                  <option value="">– wählen –</option>
                  @for (c of cuisines; track c.code) {
                    <option [value]="c.code">{{ flag(c.code) }} {{ c.label }}</option>
                  }
                </select>
              </label>
            </div>

            <label class="toggle">
              <input type="checkbox" [(ngModel)]="draft()!.vegetarian" name="vegetarian" />
              <span>Vegetarisch</span>
            </label>

            <fieldset>
              <legend>Zutaten</legend>
              @for (ing of draft()!.ingredients; track $index; let i = $index) {
                <div class="ingredient-row">
                  <input [(ngModel)]="ing.amount" [name]="'amount_'+i" placeholder="Menge (z.B. 200g)" />
                  <input [(ngModel)]="ing.name"   [name]="'iname_'+i"  placeholder="Zutat" />
                  <button type="button" class="btn-icon" (click)="removeIngredient(i)">✕</button>
                </div>
              }
              <button type="button" class="btn-add" (click)="addIngredient()">+ Zutat</button>
            </fieldset>

            <label>Zubereitung<textarea [(ngModel)]="draft()!.instructions" name="instructions"></textarea></label>

            <div class="form-actions">
              <button type="submit" class="btn-save">Speichern</button>
              <button type="button" class="btn-cancel" (click)="cancelEdit()">Abbrechen</button>
            </div>
          </form>
        }

      } @else if (!error()) {
        <div class="loading-shell" aria-hidden="true">
          <div class="loading-line loading-meta"></div>
          <div class="loading-line loading-title"></div>
          <div class="loading-line loading-block"></div>
          <div class="loading-line loading-block short"></div>
        </div>
      }
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    main {
      max-width: 680px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
      min-height: 36rem;
    }

    /* Toolbar */
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .toolbar a, .back-link { text-decoration: none; color: var(--blue); font-size: 0.9rem; cursor: pointer; }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .back-link .icon {
      width: 0.95rem;
      height: 0.95rem;
      fill: currentColor;
      flex-shrink: 0;
    }
    .toolbar-actions { display: flex; gap: 0.5rem; }

    /* Buttons */
    button {
      padding: 0.4rem 1rem;
      border-radius: 0.4rem;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .btn-edit   { background: var(--blue); color: #fff; }
    .btn-save   { background: var(--blue); color: #fff; }
    .btn-cancel { color: var(--font); background: transparent; border: 1px solid #ccc; }
    .btn-icon   { background: transparent; border: none; color: #aaa; padding: 0 0.4rem; font-size: 1rem; cursor: pointer; }
    .btn-add    { background: transparent; border: 1px dashed #aaa; border-radius: 0.4rem; color: #666; padding: 0.3rem 0.75rem; margin-top: 0.25rem; cursor: pointer; font-size: 0.85rem; }

    /* View */
    .view .meta { font-size: 0.8rem; text-transform: uppercase; color: #aaa; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
    .view .meta .flag { font-size: 1.1rem; vertical-align: middle; text-transform: none; }
    .view h1 { font-size: 1.8rem; margin-bottom: 0.75rem; }
    .veg-label { padding: 0 0.5rem; }
    .view .description { color: #666; margin-bottom: 1.5rem; }
    .view section { margin-top: 1.75rem; }
    .view h2 { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.07em; color: #aaa; margin-bottom: 0.75rem; border-bottom: 1px solid #eee; padding-bottom: 0.4rem; }
    .ingredient-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
    .ingredient-list li { display: flex; gap: 0.5rem; }
    .amount { font-weight: 600; min-width: 6rem; }
    .instructions { line-height: 1.7; white-space: pre-wrap; }

    /* Edit form */
    .edit-form { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem; }
    label { display: flex; flex-direction: column; font-size: 0.85rem; font-weight: 600; gap: 0.25rem; }
    input, textarea, select {
      padding: 0.5rem 0.75rem;
      font-size: 1rem;
      font-weight: normal;
      border: 1px solid var(--border, #ccc);
      border-radius: 0.4rem;
      background: var(--inputBg, #fff);
      color: var(--inputFont, #333);
    }
    textarea { min-height: 140px; resize: vertical; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .toggle {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    .toggle input {
      width: 1rem;
      height: 1rem;
      margin: 0;
      padding: 0;
    }
    fieldset { border: 1px solid #ccc; border-radius: 0.5rem; padding: 0.75rem; }
    legend { font-size: 0.85rem; font-weight: 600; padding: 0 0.25rem; }
    .ingredient-row { display: flex; gap: 0.4rem; margin-bottom: 0.4rem; align-items: center; }
    .ingredient-row input { flex: 1; min-width: 0; }
    .form-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }

    .error   { color: #e53e3e; }
    .loading-shell {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .loading-line {
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.12), rgba(0,0,0,.06));
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
    }
    .loading-meta { width: 7rem; height: 0.8rem; }
    .loading-title { width: 65%; height: 1.8rem; }
    .loading-block { width: 100%; height: 0.95rem; }
    .loading-block.short { width: 80%; }
    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
  `
})
export class RecipeDetail implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly service   = inject(RecipeService);
  private readonly route     = inject(ActivatedRoute);
  private readonly location  = inject(Location);

  readonly user = this.authService.currentUser;

  readonly categories = ['Vorspeise', 'Hauptspeise', 'Nachspeise', 'Kuchen', 'Plätzchen', 'Brot'];
  readonly cuisines   = CUISINES;
  readonly flag       = flagOrCode;
  readonly cuisineLabel = (code: string) => CUISINES.find(c => c.code === code)?.label ?? code;

  recipe  = signal<Recipe | null>(null);
  draft   = signal<Recipe | null>(null);
  editing = signal(false);
  error   = signal<string | null>(null);

  back(): void { this.location.back(); }

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next:  (data) => this.recipe.set({
        ...data,
        category: this.normalizeCategory(data.category),
        vegetarian: data.vegetarian ?? false
      }),
      error: ()     => this.error.set('Rezept nicht gefunden.')
    });
  }

  startEdit(): void {
    if (!this.user()) {
      return;
    }
    // Tiefe Kopie anlegen – Originaldaten bleiben unverändert
    this.draft.set({ ...JSON.parse(JSON.stringify(this.recipe())), vegetarian: this.recipe()!.vegetarian ?? false });
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.draft.set(null);
    this.editing.set(false);
  }

  addIngredient(): void {
    this.draft()!.ingredients.push({ name: '', amount: '' });
  }

  removeIngredient(index: number): void {
    this.draft()!.ingredients.splice(index, 1);
  }

  save(): void {
    const r = this.draft()!;
    const normalized = { ...r, category: this.normalizeCategory(r.category) };
    this.service.update(r.id!, normalized).subscribe({
      next: (updated) => {
        this.recipe.set({ ...updated, category: this.normalizeCategory(updated.category) });
        this.cancelEdit();
      },
      error: () => this.error.set('Fehler beim Speichern.')
    });
  }

  private normalizeCategory(category: string | null | undefined): string {
    const value = (category ?? '').trim();
    if (!value) return '';

    switch (value.toLocaleLowerCase('de-DE')) {
      case 'vorspeise':
        return 'Vorspeise';
      case 'hauptspeise':
        return 'Hauptspeise';
      case 'nachspeise':
        return 'Nachspeise';
      case 'kuchen':
        return 'Kuchen';
      case 'plätzchen':
      case 'plaetzchen':
        return 'Plätzchen';
      case 'brot':
        return 'Brot';
      case 'gebäck':
      case 'gebaeck':
        // Legacy value after category split: use Kuchen as default target.
        return 'Kuchen';
      default:
        return value;
    }
  }
}
