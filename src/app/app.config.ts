import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DatePipe, provideHttpClient(withInterceptors([
      authInterceptor
    ])),
    provideHttpClient(withFetch())]
};
