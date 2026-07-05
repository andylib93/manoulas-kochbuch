import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./start/start").then(m => m.Start)
    },
    {
        path: "recipes/new",
        loadComponent: () => import("./recipe/recipe-new").then(m => m.RecipeNew),
        canActivate: [authGuard]
    },
    {
        path: "recipes/:id",
        loadComponent: () => import("./recipe/recipe-detail").then(m => m.RecipeDetail)
    },
    {
        path: "login",
        loadComponent: () => import("./login/login").then(m => m.Login)
    },
    {
        path: "profile",
        loadComponent: () => import("./profile/profile").then(m => m.Profile),
        canActivate: [authGuard]
    },
    { path: "**", redirectTo: "" }
];
