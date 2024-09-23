import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService, UserInfo } from 'angular-oauth2-oidc';

import {
  AuthUserInfo,
  GetUserInfoResponse,
} from '../interfaces/user-oicd.interface';
import { StateHandlerService } from './stateHandler.service';

interface AuthServiceState {
  authenticatedUser: AuthUserInfo | null;
  authenticated: boolean;
  authenticationChanged: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //* state
  #state = signal<AuthServiceState>({
    authenticatedUser: null,
    authenticated: false,
    authenticationChanged: false,
  });

  //* signals to get the data
  public authenticatedUser = computed(() => this.#state().authenticatedUser);

  public authenticated = computed(() => this.#state().authenticated);

  public authenticationChanged = computed(
    () => this.#state().authenticationChanged
  );

  //* services injected
  private readonly oauthService: OAuthService = inject(OAuthService);

  private readonly authConfig: AuthConfig = inject(AuthConfig);

  private readonly stateHandler: StateHandlerService =
    inject(StateHandlerService);

  constructor() {}

  // * methods

  private async getUserProfile(): Promise<UserInfo> {
    const getUserInfoResponse =
      (await this.oauthService.loadUserProfile()) as GetUserInfoResponse;

    return getUserInfoResponse.info;
  }

  public async authenticate(setState: boolean = true): Promise<boolean> {
    // setup to do try the login
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.strictDiscoveryDocumentValidation = false;
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // get if the token is valid
    this.#state.update((lastState) => ({
      ...lastState,
      authenticated: this.oauthService.hasValidAccessToken(),
    }));

    // if user is not authenticated login
    if (!this.oauthService.hasValidIdToken() || !this.authenticated()) {
      const newState = setState
        ? await this.stateHandler.createState().toPromise()
        : undefined;

      this.oauthService.initCodeFlow(newState);
    }

    // update the state because the authentication changed
    this.#state.update((lastState) => ({
      ...lastState,
      authenticationChanged: this.authenticated(),
    }));

    // if authenticated get the user info
    const user = (await this.getUserProfile()) as AuthUserInfo;

    if (this.authenticated()) {
      this.#state.update((lastState) => ({
        ...lastState,
        authenticatedUser: user,
      }));
    }

    return this.authenticated();
  }

  public signOut(): void {
    // logout from the service
    this.oauthService.logOut();

    // update the state
    this.#state.set({
      authenticatedUser: null,
      authenticated: false,
      authenticationChanged: false,
    });
  }
}
