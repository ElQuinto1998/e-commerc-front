import { Injectable } from '@angular/core';
import { REGISTER_USER } from '@graphql/operations/mutation/user';
import { USERS } from '@graphql/operations/query/user';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { IRegisterForm } from './interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getUsers() {
    return this.get(USERS, { include: true }, {}).pipe(
      map((result: any) => {
        return result.users;
      })
    );
  }

  register(user: IRegisterForm) {
    return this.set(REGISTER_USER, {user, include: false}, {})
      .pipe(
        map((result: any) => {
          return result.register;
        })
      );
  }
}
