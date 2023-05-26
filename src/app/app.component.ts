import { Component } from '@angular/core';
import { AppAuthService } from './services/app.auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'm294_project_frontend_sboccia';

  constructor(private authService: AppAuthService) {}

  public login() {
      this.authService.login();
    }

  public logout() {
    this.authService.logout();
  }
}

