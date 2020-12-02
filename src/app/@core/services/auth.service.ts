import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_QUERY, USER_INFO } from '@graphql/operations/query/user';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMeData, ISession } from './interfaces/sesion.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  accessVariable = new Subject<IMeData>();

  accessVariable$ = this.accessVariable.asObservable();

  constructor(apollo: Apollo) {
    super(apollo);
  }

  updateSession(newValue: IMeData) {
    this.accessVariable.next(newValue);
  }

  start() {
    if (this.getSession() !== null) {
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status) {
          this.resetSession();
          return;
        }
        this.updateSession(result);
      });
      console.log('Session iniciada');
      return;
    }
    this.updateSession({
      status: false,
    });
    return;
  }

  login(email: string, password: string) {
    return this.get(LOGIN_QUERY, { email, password, include: false }, {}).pipe(
      map((result: any) => {
        return result.login;
      })
    );
  }

  register() {}

  getMe() {
    const context = {
      headers: new HttpHeaders({
        Authorization: (this.getSession() as ISession).token,
      }),
    };
    return this.get(USER_INFO, { include: false }, context).pipe(
      map((result: any) => {
        return result.me;
      })
    );
  }

  setSession(token: string, expireTime: number = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expireTime);
    const session: ISession = {
      expireTime: new Date(date).toISOString(),
      token,
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession {
    return JSON.parse(localStorage.getItem('session'));
  }

  resetSession() {
    localStorage.removeItem('session');
  }
}
