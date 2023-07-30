import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, lastValueFrom, map, of } from 'rxjs';

import * as mock from 'assets/data.json';

import { Option } from '../types/option';

import { handleFilter, handleSort } from '../helpers/array-utils.helper';

type ProductRequests = typeof mock.productRequests;

@Injectable({ providedIn: 'root' })
export class ApiService {
  dataSource: BehaviorSubject<typeof mock> = new BehaviorSubject({
    currentUser: {
      image: '',
      name: '',
      username: '',
    },
    productRequests: [] as typeof mock.productRequests,
  });

  filteredDataSource: BehaviorSubject<ProductRequests> = new BehaviorSubject(
    [] as ProductRequests
  );

  dataFilter = new BehaviorSubject('');
  dataSort: BehaviorSubject<Option> = new BehaviorSubject({} as Option);

  currentData = this.dataSource.asObservable();
  filteredData = this.filteredDataSource.asObservable();
  filterObservable = this.dataFilter.asObservable();
  sortObservable = this.dataSort.asObservable();

  filterSubscription = this.filterObservable.subscribe(
    this.filterSubscriptionHandler
  );
  sortSubscription = this.sortObservable.subscribe(
    this.sortSubscriptionHandler
  );

  constructor() {
    this.fetchJSON();
  }

  fetchJSON() {
    lastValueFrom(of(mock).pipe(delay(500))).then((data) => {
      this.dataSource.next(data);
      this.filteredDataSource.next(data.productRequests);
    });
  }

  filterSubscriptionHandler(filter: string) {
    const data = this.dataSource.getValue();

    this.filteredDataSource.next(
      data.productRequests.filter((item) =>
        handleFilter(item, filter.toLowerCase())
      )
    );
  }

  sortSubscriptionHandler(sort: Option) {
    const data = this.dataSource.getValue();

    this.filteredDataSource.next(
      data.productRequests.sort((a, b) => handleSort(a, b, sort))
    );
  }

  setFilter(filter: string) {
    this.dataFilter.next(filter);
  }

  setSort(sort: Option) {
    this.dataSort.next(sort);
  }
}
