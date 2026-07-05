import { Component, signal, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { Nav } from "../nav/nav";
import { Footer } from "../footer/footer";
import { RecipeService } from "../recipe/recipe.service";
import { Recipe, PageResponse } from "../recipe/recipe.model";
import { CUISINES, flagOrCode, Cuisine } from "../recipe/cuisine";

const CATEGORIES = ['Vorspeise', 'Hauptspeise', 'Nachspeise', 'Kuchen', 'Plätzchen', 'Brot', '🌱'];
const VEGETARIAN_CATEGORY = '🌱';

@Component({
	selector: "app-start",
	imports: [Nav, Footer, FormsModule, RouterLink],
	template: `
		<app-nav></app-nav>
		<main>
			<!-- Suchzeile -->
			<div class="search-bar">
				<input
					type="text"
					placeholder="Rezept suchen …"
					[(ngModel)]="searchTerm"
					(ngModelChange)="onSearch()"
				/>
			</div>

			<!-- Kategorie-Filter -->
			<div class="filter-section">
				<span class="filter-label">Kategorie</span>
				<div class="filter-bar">
					@for (cat of categories; track cat) {
						<button
							[class.active]="activeCategory() === cat"
							(click)="toggleCategory(cat)"
						>{{ cat }}</button>
					}
				</div>
			</div>

			<!-- Küchen-Filter -->
			<div class="filter-section">
				<span class="filter-label">Küche</span>
				<div class="filter-bar cuisine-bar">
					@for (c of cuisines; track c.code) {
						<button
							[class.active]="activeCuisine() === c.code"
							(click)="toggleCuisine(c.code)"
							[title]="c.label"
						>{{ flag(c.code) }}</button>
					}
				</div>
			</div>

			<!-- Info-Zeile -->
			@if (loadError()) {
				<p class="load-error">⚠️ {{ loadError() }}</p>
			}
			@if (page()) {
				<p class="info">
					{{ page()!.totalElements }} Rezepte
					@if (activeCategory()) { · {{ categoryLabel(activeCategory()!) }} }
					@if (activeCuisine()) { · {{ flag(activeCuisine()!) }} {{ cuisineLabel(activeCuisine()!) }} }
					@if (searchTerm) { · „{{ searchTerm }}" }
				</p>
			}

			<!-- Rezeptkarten -->
			@if (loading() && !page()) {
				<div class="grid" aria-hidden="true">
					@for (_ of skeletonCards; track $index) {
						<div class="card skeleton">
							<div class="skeleton-line skeleton-meta"></div>
							<div class="skeleton-line skeleton-title"></div>
						</div>
					}
				</div>
			} @else {
				<div class="grid">
					@for (recipe of recipes(); track recipe.id) {
						<a class="card" [routerLink]="['/recipes', recipe.id]">
							<span class="card-meta">
								<span class="card-category">{{ recipe.category }}</span>
								<span class="card-tags">
									@if (recipe.vegetarian) {
										<span class="veg-badge">🌱</span>
									}
									@if (recipe.cuisine) {
										<span class="card-flag" [title]="cuisineLabel(recipe.cuisine)">{{ flag(recipe.cuisine) }}</span>
									}
								</span>
							</span>
							<h3>{{ recipe.name }}</h3>
						</a>
					}
					@empty {
						<p class="empty">Keine Rezepte gefunden.</p>
					}
				</div>
			}

			<!-- Paginierung -->
			@if (page() && page()!.totalPages > 1) {
				<div class="pagination">
					<button (click)="goTo(0)" [disabled]="currentPage() === 0">«</button>
					<button (click)="goTo(currentPage() - 1)" [disabled]="currentPage() === 0">‹</button>
					<span>Seite {{ currentPage() + 1 }} / {{ page()!.totalPages }}</span>
					<button (click)="goTo(currentPage() + 1)" [disabled]="currentPage() >= page()!.totalPages - 1">›</button>
					<button (click)="goTo(page()!.totalPages - 1)" [disabled]="currentPage() >= page()!.totalPages - 1">»</button>
				</div>
			}
		</main>
		<app-footer></app-footer>
	`,
	styles: `
		main {
			min-height: 40rem;
			padding: 2rem 4rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.25rem;
		}

		/* Suchzeile */
		.search-bar { width: 100%; max-width: 40rem; }
		.search-bar input {
			color: var(--font);
			background-color: var(--bg);
			width: 100%;
			padding: 0.6rem 1rem;
			border: 1px solid #ccc;
			border-radius: 2rem;
			font-size: 1rem;
			outline: none;
		}
		.search-bar input:focus { border-color: var(--blue); }

		/* Filter-Sektion */
		.filter-section { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
		.filter-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.07em; color: #aaa; }

		/* Filter-Buttons */
		.filter-bar {
			display: flex;
			flex-wrap: wrap;
			gap: 0.4rem;
			justify-content: center;
		}
		.filter-bar button {
			padding: 0.35rem 0.9rem;
			border: 2px solid var(--border, #ccc);
			border-radius: 2rem;
			background: transparent;
			color: var(--font);
			cursor: pointer;
			font-size: 0.875rem;
			touch-action: manipulation;
			-webkit-tap-highlight-color: transparent;
			transition: all 0.15s;
		}
		.filter-bar button.active {
			border-color: var(--blue);
			background: var(--blue);
			color: #fff;
		}
		@media (hover: hover) and (pointer: fine) {
			.filter-bar button:hover {
				border-color: var(--blue);
				background: var(--blue);
				color: #fff;
			}
		}
		/* Küchen-Buttons: kompakter, nur Emoji */
		.cuisine-bar button {
			padding: 0.3rem 0.55rem;
			font-size: 1.15rem;
			line-height: 1;
			min-width: 2.4rem;
		}

		/* Info + Fehler */
		.info { color: #888; font-size: 0.85rem; margin: 0; }
		.load-error { color: #e53e3e; font-size: 0.9rem; margin: 0; }

		/* Rezept-Grid */
		.grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
			gap: 1rem;
			width: 100%;
		}
		.card {
			display: flex;
			flex-direction: column;
			gap: 0.3rem;
			padding: 1.1rem 1.25rem;
			background: var(--bg, #fff);
			border: 1px solid var(--border, #e0e0e0);
			border-radius: 0.75rem;
			box-shadow: 0 4px 12px -4px rgba(0,0,0,.1);
			text-decoration: none;
			color: inherit;
			transition: box-shadow 0.15s, transform 0.15s;
		}
		.card:hover { box-shadow: 0 8px 20px -6px rgba(0,0,0,.18); transform: translateY(-2px); }
		.card h3 { margin: 0; font-size: 1rem; }
		.card-meta { display: flex; justify-content: space-between; align-items: center; }
		.card-category { font-size: 0.72rem; text-transform: uppercase; color: #aaa; letter-spacing: 0.05em; }
		.card-tags { display: inline-flex; align-items: center; gap: 0.35rem; }
		.veg-badge { padding: 0.1rem 0.35rem; }
		.card-flag { font-size: 1.1rem; line-height: 1; }
		.empty { grid-column: 1/-1; text-align: center; color: #aaa; }
		.skeleton {
			pointer-events: none;
		}
		.skeleton-line {
			border-radius: 999px;
			background: linear-gradient(90deg, rgba(0,0,0,.06), rgba(0,0,0,.12), rgba(0,0,0,.06));
			background-size: 200% 100%;
			animation: shimmer 1.4s ease-in-out infinite;
		}
		.skeleton-meta {
			width: 55%;
			height: 0.75rem;
		}
		.skeleton-title {
			width: 80%;
			height: 1rem;
			margin-top: 0.35rem;
		}

		/* Paginierung */
		.pagination { display: flex; align-items: center; gap: 0.5rem; }
		.pagination button { color: var(--font); padding: 0.3rem 0.7rem; border: 1px solid #ccc; border-radius: 0.4rem; background: transparent; cursor: pointer; }
		.pagination button:disabled { opacity: 0.35; cursor: default; }
		.pagination span { font-size: 0.9rem; min-width: 8rem; text-align: center; }

		@keyframes shimmer {
			0% { background-position: 0% 50%; }
			100% { background-position: 200% 50%; }
		}
	`
})
export class Start implements OnInit {
	readonly categories = CATEGORIES;
	readonly categoryLabel = (cat: string) => cat === VEGETARIAN_CATEGORY ? 'Vegetarisch' : cat;
	readonly cuisines: Cuisine[] = CUISINES;
	readonly flag = flagOrCode;
	readonly cuisineLabel = (code: string) => CUISINES.find(c => c.code === code)?.label ?? code;
	readonly skeletonCards = Array.from({ length: 8 });

	private readonly recipeService = inject(RecipeService);
	private readonly router        = inject(Router);
	private readonly route         = inject(ActivatedRoute);

	recipes        = signal<Recipe[]>([]);
	page           = signal<PageResponse<Recipe> | null>(null);
	currentPage    = signal(0);
	activeCategory = signal<string | null>(null);
	activeCuisine  = signal<string | null>(null);
	searchTerm     = '';
	loading        = signal(true);
	loadError      = signal<string | null>(null);
	private searchTimer: ReturnType<typeof setTimeout> | null = null;

	ngOnInit() {
		const params = this.route.snapshot.queryParamMap;
		this.currentPage.set(Number(params.get('page') ?? 0));
		const vegetarian = params.get('vegetarian') === 'true';
		this.activeCategory.set(vegetarian ? VEGETARIAN_CATEGORY : params.get('category'));
		this.activeCuisine.set(params.get('cuisine'));
		this.searchTerm = params.get('search') ?? '';
		this.load();
	}

	toggleCategory(cat: string) {
		this.activeCategory.set(this.activeCategory() === cat ? null : cat);
		this.currentPage.set(0);
		this.syncUrl();
		this.load();
	}

	toggleCuisine(code: string) {
		this.activeCuisine.set(this.activeCuisine() === code ? null : code);
		this.currentPage.set(0);
		this.syncUrl();
		this.load();
	}

	onSearch() {
		if (this.searchTimer) clearTimeout(this.searchTimer);
		this.searchTimer = setTimeout(() => {
			this.currentPage.set(0);
			this.syncUrl();
			this.load();
		}, 300);
	}

	goTo(p: number) {
		this.currentPage.set(p);
		this.syncUrl();
		this.load();
		window.scrollTo({ top: 0, behavior: "instant" });
	}

	private syncUrl() {
		const queryParams: Record<string, string | number | null> = {};
		const filters = this.getCategoryFilters();
		if (this.currentPage() > 0)   queryParams['page']     = this.currentPage();
		if (filters.category)          queryParams['category'] = filters.category;
		if (filters.vegetarian)        queryParams['vegetarian'] = 'true';
		if (this.activeCuisine())      queryParams['cuisine']  = this.activeCuisine();
		if (this.searchTerm.trim())    queryParams['search']   = this.searchTerm.trim();
		this.router.navigate([], { relativeTo: this.route, queryParams, replaceUrl: true });
	}

	private load() {
		this.loadError.set(null);
		const filters = this.getCategoryFilters();
		this.loading.set(true);
		this.recipeService
			.getAll(
				this.currentPage(),
				25,
				filters.category,
				this.searchTerm || undefined,
				this.activeCuisine() ?? undefined,
				filters.vegetarian
			)
			.subscribe({
				next: resp => {
					this.recipes.set(resp.content);
					this.page.set(resp);
					this.loading.set(false);
				},
				error: err => {
					console.error('Fehler beim Laden der Rezepte:', err);
					this.loadError.set('Rezepte konnten nicht geladen werden.');
					this.loading.set(false);
				}
			});
	}

	private getCategoryFilters(): { category?: string; vegetarian?: boolean } {
		const category = this.activeCategory();
		if (category === VEGETARIAN_CATEGORY) {
			return { vegetarian: true };
		}
		return { category: category ?? undefined };
	}
}
