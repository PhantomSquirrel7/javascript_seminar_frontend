import { CustomAuthenticationService } from '@app/_services/custom';

export function appInitializer(
  authenticationService: CustomAuthenticationService
) {
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      if (authenticationService.tokenValue)
        authenticationService
          .refreshToken({
            refreshToken: authenticationService.tokenValue.refresh.token,
          })
          .subscribe()
          .add(resolve);
    });
}
