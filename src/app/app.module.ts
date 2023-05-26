import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.development';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppAuthGuard } from './guard/app.auth.guard';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptors';
import { AppAuthService } from './services/app.auth.service';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'demoapp',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

/*export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}*/

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}})
  ],
  providers: [
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    AppAuthGuard,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
 ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
