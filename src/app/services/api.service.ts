import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, lastValueFrom, map, of } from 'rxjs';

import * as mock from 'assets/data.json';
import { Option } from '../types/option';

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

  currentData = this.dataSource.asObservable();

  filteredDataSource: BehaviorSubject<ProductRequests> = new BehaviorSubject(
    [] as ProductRequests
  );

  filteredData = this.filteredDataSource.asObservable();

  dataFilter = new BehaviorSubject('');

  filterObservable = this.dataFilter.asObservable();

  filterSubscription = this.filterObservable.subscribe((filter) => {
    const data = this.dataSource.getValue();

    this.filteredDataSource.next(
      data.productRequests.filter((item) =>
        this.handleFilter(item, filter.toLowerCase())
      )
    );
  });

  dataSort: BehaviorSubject<Option> = new BehaviorSubject({} as Option);

  sortObservable = this.dataSort.asObservable();

  sortSubscription = this.sortObservable.subscribe((sort) => {
    const data = this.dataSource.getValue();

    this.filteredDataSource.next(
      data.productRequests.sort((a, b) => this.handleSort(a, b, sort))
    );
  });

  constructor() {
    this.fetchJSON();
  }

  fetchJSON() {
    lastValueFrom(of(mock).pipe(delay(500))).then((data) => {
      this.dataSource.next(data);
      this.filteredDataSource.next(data.productRequests);
    });
  }

  setFilter(filter: string) {
    this.dataFilter.next(filter);
  }

  handleFilter(item: (typeof mock.productRequests)[number], filter: string) {
    if (filter === 'all') return true;

    return item.category === filter;
  }

  setSort(sort: Option) {
    this.dataSort.next(sort);
  }

  handleSort(
    a: ProductRequests[number],
    b: ProductRequests[number],
    sort: Option
  ) {
    const sortByParameter = {
      upvotes: (a: ProductRequests[number], b: ProductRequests[number]) => {
        if (sort.order === 'DESC') {
          return a.upvotes < b.upvotes ? 1 : -1;
        }

        return a.upvotes > b.upvotes ? 1 : -1;
      },
      comments: (a: ProductRequests[number], b: ProductRequests[number]) => {
        if (sort.order === 'DESC') {
          return Number(a.comments?.length) < Number(b.comments?.length)
            ? 1
            : -1;
        }

        return Number(a.comments?.length) > Number(b.comments?.length) ? 1 : -1;
      },
    };

    return sortByParameter[sort.value](a, b);
  }
}
