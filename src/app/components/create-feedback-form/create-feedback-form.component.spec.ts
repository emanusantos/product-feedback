import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeedbackFormComponent } from './create-feedback-form.component';

describe('CreateFeedbackFormComponent', () => {
  let component: CreateFeedbackFormComponent;
  let fixture: ComponentFixture<CreateFeedbackFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFeedbackFormComponent]
    });
    fixture = TestBed.createComponent(CreateFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
