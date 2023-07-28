import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import mock from 'assets/data.json';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private client: HttpClient) {}

  fetchJSON() {
    return of(mock).pipe(delay(500));
  }
}
