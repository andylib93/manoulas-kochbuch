import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, PageResponse } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/recipes';

  getAll(page = 0, size = 25, category?: string, search?: string, cuisine?: string, vegetarian?: boolean): Observable<PageResponse<Recipe>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (category) params = params.set('category', category);
    if (search)   params = params.set('search',   search);
    if (cuisine)  params = params.set('cuisine',  cuisine);
    if (vegetarian !== undefined) params = params.set('vegetarian', String(vegetarian));
    return this.http.get<PageResponse<Recipe>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  create(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, recipe);
  }

  update(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/${id}`, recipe);
  }
}
