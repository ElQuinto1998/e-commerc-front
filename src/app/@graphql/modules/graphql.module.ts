import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    //Para capturar errores de consulta y/o de red
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log('Graphql errors', graphQLErrors);
      }
      if (networkError) {
        console.log('Network error', networkError);
      }
    });
    const uri = `http://localhost:9000/graphql`;
    const link = ApolloLink.from([errorLink, httpLink.create({ uri })]);
    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
