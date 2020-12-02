import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import {
  ILoginForm,
  IResultLogin,
} from '@core/services/interfaces/login.interface';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  login: ILoginForm = {
    email: '',
    password: '',
  };

  constructor(private apiAuth: AuthService, private router: Router) {}

  init() {
    console.log(this.login);
    this.apiAuth
      .login(this.login.email, this.login.password)
      .subscribe((response: IResultLogin) => {
        console.log(response);
        if (response.status) {
          if (response.token !== null) {
            this.apiAuth.setSession(response.token);
            basicAlert(TYPE_ALERT.SUCCESS, response.message);
            this.apiAuth.updateSession(response);
            this.router.navigate(['/home']);
            return;
          }
          basicAlert(TYPE_ALERT.WARNING, response.message);
          return;
        }
        basicAlert(TYPE_ALERT.INFO, response.message);
      });
  }
}
