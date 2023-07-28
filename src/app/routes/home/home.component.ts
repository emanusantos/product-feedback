import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as mock from 'assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  data: typeof mock = {
    currentUser: {} as typeof mock.currentUser,
    productRequests: [],
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    document.body.className = 'home';

    this.apiService.fetchJSON().subscribe((data) => {
      this.data = data;
    });
  }
}
