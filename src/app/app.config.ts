import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  AuthConfig,
  OAuthStorage,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { authConfig, stateHandlerFn } from './auth/config/index';
import {
  StateHandlerProcessorService,
  StateHandlerProcessorServiceImpl,
  StateHandlerService,
  StateHandlerServiceImpl,
  StorageService,
} from './auth/services/index';

import { environment } from '../environments/environments';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideHttpClient(),
    // * configuration for auth system
    provideOAuthClient({
      resourceServer: {
        // TODO verify this urls
        allowedUrls: [
          environment.auth_issuer + '/admin/v1',
          environment.auth_issuer + '/management/v1',
          environment.auth_issuer + '/auth/v1/',
        ],
        sendAccessToken: true,
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: stateHandlerFn,
      multi: true,
      deps: [StateHandlerService],
    },
    {
      provide: AuthConfig,
      useValue: authConfig,
    },
    {
      provide: StateHandlerProcessorService,
      useClass: StateHandlerProcessorServiceImpl,
    },
    {
      provide: StateHandlerService,
      useClass: StateHandlerServiceImpl,
    },
    {
      provide: OAuthStorage,
      useClass: StorageService,
    },
  ],
};
