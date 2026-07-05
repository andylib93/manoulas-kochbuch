import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

document.addEventListener("visibilitychange", (): void => {
    document.visibilityState === "visible"
        ? document.title = "Manoúlas Kochbuch"
        : document.title = "Happy Cooking 🧑‍🍳";
});
