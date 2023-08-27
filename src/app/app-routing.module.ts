import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { FeedbackDetailComponent } from './routes/feedback-detail/feedback-detail.component';
import { CreateFeedbackComponent } from './routes/create-feedback/create-feedback.component';
import { EditFeedbackComponent } from './routes/edit-feedback/edit-feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateFeedbackComponent },
  { path: 'feedback/:id', component: FeedbackDetailComponent },
  { path: 'feedback/edit/:id', component: EditFeedbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
