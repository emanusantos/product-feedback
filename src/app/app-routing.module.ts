import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { FeedbackDetailComponent } from './routes/feedback-detail/feedback-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feedback/:id', component: FeedbackDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
