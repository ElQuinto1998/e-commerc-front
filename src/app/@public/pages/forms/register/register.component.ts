import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IRegisterForm,
  IResultRegister,
} from '@core/services/interfaces/register.interface';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register: IRegisterForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthday: '',
  };

  constructor(private api: UsersService, private router: Router) {}

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.register.birthday = data.toISOString().substring(0, 10);
    console.log(this.register);
  }

  private formarNumbers(num: number | string) {
    return +num < 10 ? `0${num}` : num;
  }

  dataAsing($event) {
    console.log('Tomando dato ', $event);
    const fecha = `${$event.year}-${this.formarNumbers(
      $event.month
    )}-${this.formarNumbers($event.day)}`;
    this.register.birthday = fecha;
  }

  addUser() {
    console.log('Registro', this.register);
    this.api.register(this.register).subscribe((response: IResultRegister) => {
      console.log('result', response);
      if (!response.status) {
        basicAlert(TYPE_ALERT.WARNING, response.message);
        return;
      }
      basicAlert(TYPE_ALERT.SUCCESS, response.message);
      this.router.navigate(['/login']);
    });
  }
}
