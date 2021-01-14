import { Component, Input, OnInit } from '@angular/core';
import {
  IInfoPage,
  IResultData,
} from '@core/services/interfaces/result.data.interface';
import { ITableColumns } from '@core/services/interfaces/table.columns.interface';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablePaginationService } from './table-pagination.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage = 10;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  infoPage: IInfoPage;
  data$: Observable<any>;

  constructor(private paginationService: TablePaginationService) {}

  ngOnInit(): void {
    if (this.query === undefined) {
      throw new Error('Query is undefined, please add');
    }

    if (this.resultData === undefined) {
      throw new Error('ResultData is undefined, please add');
    }

    if (this.tableColumns === undefined) {
      throw new Error('Table columns is undefined, please add');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1,
    };

    this.loadData();
  }

  loadData() {
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
    };
    this.data$ = this.paginationService
      .getCollectionData(this.query, variables, {})
      .pipe(
        map((result: any) => {
          const data = result[this.resultData.definitionKey];
          console.log(data)
          this.infoPage.pages = data.info.pages;
          this.infoPage.total = data.info.total;
          return data[this.resultData.listKey];
        })
      );
  }

  changePage() {
    this.loadData();
  }
}
