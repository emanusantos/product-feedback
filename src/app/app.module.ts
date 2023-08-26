import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './routes/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { UpvotesComponent } from './components/upvotes/upvotes.component';
import { TagComponent } from './components/tag/tag.component';
import { MenuComponent } from './components/menu/menu.component';
import { EmptyComponent } from './components/empty/empty.component';
import { BackComponent } from './components/back/back.component';
import { FeedbackDetailComponent } from './routes/feedback-detail/feedback-detail.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreateFeedbackComponent } from './routes/create-feedback/create-feedback.component';
import { FormItemComponent } from './components/form-item/form-item.component';
import { CreateFeedbackFormComponent } from './components/create-feedback-form/create-feedback-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    HeaderComponent,
    SelectComponent,
    FeedbackComponent,
    UpvotesComponent,
    TagComponent,
    MenuComponent,
    EmptyComponent,
    BackComponent,
    FeedbackDetailComponent,
    CommentComponent,
    CreateFeedbackComponent,
    FormItemComponent,
    CreateFeedbackFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
