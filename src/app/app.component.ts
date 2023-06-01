import { Component } from '@angular/core';
import { AppAuthService } from './services/app.auth.service';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
[x: string]: any;
  title = 'm294_project_frontend_sboccia';

  public constructor(public authService: AppAuthService, public oauthService: OAuthService) {}

  public login() {
      this.authService.login();
    }

  public logout() {
    this.authService.logout();
  }
}

