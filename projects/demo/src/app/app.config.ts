import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { TemplatePageTitleStrategy } from './app-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
};
