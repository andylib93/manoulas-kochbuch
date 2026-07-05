import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { CUISINES, flagOrCode } from './cuisine';

@Component({
  selector: 'app-recipe-new',
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
        <h1>Neues Rezept</h1>
      </div>

      @if (error()) { <p class="error">{{ error() }}</p> }

      <form (submit)="create()">
        <label>
          <p>Name <span class="required">*</span></p>
          <input [(ngModel)]="form.name" name="name" required placeholder="z.B. Pizza Margherita" />
        </label>
        
        <div class="row">
          <label>Kategorie
            <select [(ngModel)]="form.category" name="category">
              <option value="">– wählen –</option>
              @for (c of categories; track c) { <option>{{ c }}</option> }
            </select>
          </label>
          <label>Küche
            <select [(ngModel)]="form.cuisine" name="cuisine">
              <option value="">– wählen –</option>
              @for (c of cuisines; track c.code) {
                <option [value]="c.code">{{ flag(c.code) }} {{ c.label }}</option>
              }
            </select>
          </label>
        </div>

        <label class="toggle">
          <input type="checkbox" [(ngModel)]="form.vegetarian" name="vegetarian" />
          <span>Vegetarisch</span>
        </label>

        <fieldset>
          <legend>Zutaten</legend>
          @for (ing of form.ingredients; track $index; let i = $index) {
            <div class="ingredient-row">
              <input [(ngModel)]="ing.amount" [name]="'amount_'+i" placeholder="Menge (z.B. 200g, 3 EL)" />
              <input [(ngModel)]="ing.name"   [name]="'iname_'+i"  placeholder="Zutat" />
              <button type="button" class="btn-icon" (click)="removeIngredient(i)">✕</button>
            </div>
          }
          <button type="button" class="btn-add" (click)="addIngredient()">+ Zutat</button>
        </fieldset>

        <label>Zubereitung
          <textarea [(ngModel)]="form.instructions" name="instructions" placeholder="Schritt-für-Schritt …"></textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="btn-save" [disabled]="saving()">
            {{ saving() ? 'Wird gespeichert …' : 'Rezept erstellen' }}
          </button>
        </div>
      </form>
    </main>
    <app-footer></app-footer>
  `,
  styles: `
    main {
      max-width: 680px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1.75rem;
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
    
    .toolbar h1 { font-size: 1.5rem; margin: 0; }

    form { display: flex; flex-direction: column; gap: 0.75rem; }

    label { display: flex; flex-direction: column; font-size: 0.85rem; font-weight: 600; gap: 0.25rem; }
    .required { color: #e53e3e; }

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

    .btn-icon { background: transparent; border: none; color: #aaa; padding: 0 0.4rem; font-size: 1rem; cursor: pointer; }
    .btn-add  { background: transparent; border: 1px dashed #aaa; border-radius: 0.4rem; color: #666; padding: 0.3rem 0.75rem; margin-top: 0.25rem; cursor: pointer; font-size: 0.85rem; }

    .form-actions { display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem; }
    .btn-save {
      padding: 0.55rem 1.5rem;
      background: var(--blue);
      color: #fff;
      border: none;
      border-radius: 0.4rem;
      font-size: 1rem;
      cursor: pointer;
    }
    .btn-save:disabled { opacity: 0.5; cursor: default; }
    .btn-cancel { text-decoration: none; color: #666; font-size: 0.9rem; }

    .error { color: #e53e3e; }
  `
})
export class RecipeNew {
  private readonly service  = inject(RecipeService);
  private readonly router   = inject(Router);
  private readonly location = inject(Location);

  readonly categories = ['Vorspeise', 'Hauptspeise', 'Nachspeise', 'Kuchen', 'Plätzchen', 'Brot'];
  readonly cuisines   = CUISINES;
  readonly flag       = flagOrCode;

  saving = signal(false);
  error  = signal<string | null>(null);

  form: Recipe = { name: '', description: '', cuisine: '', vegetarian: false, ingredients: [], instructions: '', category: '' };

  back(): void { this.location.back(); }

  addIngredient(): void {
    this.form.ingredients.push({ name: '', amount: '' });
  }

  removeIngredient(index: number): void {
    this.form.ingredients.splice(index, 1);
  }

  create(): void {
    this.saving.set(true);
    this.error.set(null);
    this.service.create(this.form).subscribe({
      next:  (created) => this.router.navigate(['/recipes', created.id]),
      error: () => {
        this.error.set('Fehler beim Erstellen. Bitte erneut versuchen.');
        this.saving.set(false);
      }
    });
  }
}
