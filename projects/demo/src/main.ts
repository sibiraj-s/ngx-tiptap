import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, { ...appConfig, providers: [provideZoneChangeDetection(), ...appConfig.providers] }).catch(
  (err) => console.error(err),
);
