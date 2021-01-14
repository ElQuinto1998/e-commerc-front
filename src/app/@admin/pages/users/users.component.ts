import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/services/interfaces/result.data.interface';
import { ITableColumns } from '@core/services/interfaces/table.columns.interface';
import { USERS } from '@graphql/operations/query/user';
import { DocumentNode } from 'graphql';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  query: DocumentNode = USERS;
  context: object;
  itemsPage: number;
  resultData: IResultData
  include: boolean;
  columns: Array<ITableColumns>;

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10 ;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users'
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre del usuario'
      },
      {
        property: 'lastname',
        label: 'Apellido'
      },
      {
        property: 'email',
        label: 'Email'
      },
      {
        property: 'role',
        label: 'Rol'
      }
    ];
  }

}
