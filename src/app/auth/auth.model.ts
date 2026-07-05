export interface AuthUser {
  username: string;
  roles: string[];
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RecipeOverview {
  totalRecipes: number;
  categories: Record<string, number>;
}
