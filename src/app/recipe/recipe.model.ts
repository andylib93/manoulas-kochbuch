export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  cuisine: string;
  vegetarian: boolean;
  ingredients: Ingredient[];
  instructions: string;
  category: string;
}

export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}
