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
import { HeadComponent } from './components/head/head.component';
import { ContentScrapbookComponent } from './components/content-scrapbook/content-scrapbook.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ContentSitesComponent } from './components/content-sites/content-sites.component';
import { ContentRatingsComponent } from './components/content-ratings/content-ratings.component';
import { ContentCommentsComponent } from './components/content-comments/content-comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListScrapbookComponent } from './components/list-scrapbook/list-scrapbook.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatTableModule} from "@angular/material/table";
import { IsInRoleDirective } from './dir/is.in.role.dir';



export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/scrapbook',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'scrapbook',
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
    FooterComponent,
    HeadComponent,
    ContentScrapbookComponent,
    ContentSitesComponent,
    ContentRatingsComponent,
    ContentCommentsComponent,
    DashboardComponent,
    ListScrapbookComponent,
    ConfirmDialogComponent,
    IsInRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
     /* Materials */
     MatSidenavModule,
     MatButtonModule,
     MatSlideToggleModule,
     MatCheckboxModule,
     MatIconModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatSelectModule,
     MatToolbarModule,
     MatSnackBarModule,
     MatDialogModule,
     MatInputModule,
     MatPaginatorModule,
     MatTableModule
  ],
  providers: [
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    AppAuthGuard,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
 ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
