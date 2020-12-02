import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { IRegisterForm } from '@core/services/interfaces/register.interface';
import { REGISTER_USER } from '@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  get(query: DocumentNode, variables: object = {}, context: object = {}) {
    return this.apollo
      .watchQuery({
        query,
        variables,
        context,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data;
        })
      );
  }

  set(mutation: DocumentNode, variables: object = {}, context: object = {}) {
    return this.apollo
      .mutate({
        mutation,
        variables,
        context
      })
      .pipe(
        map((result) => {
          return result.data;
        })
      );
  }
}
