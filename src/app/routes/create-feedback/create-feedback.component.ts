import { Component, OnInit } from '@angular/core';
import { categoriesWithoutAll } from 'src/app/constants/categories';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.sass'],
})
export class CreateFeedbackComponent implements OnInit {
  ngOnInit(): void {
    document.body.className = 'create';
  }
}
