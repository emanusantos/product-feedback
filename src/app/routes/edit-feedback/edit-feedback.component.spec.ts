import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeedbackComponent } from './edit-feedback.component';

describe('EditFeedbackComponent', () => {
  let component: EditFeedbackComponent;
  let fixture: ComponentFixture<EditFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeedbackComponent]
    });
    fixture = TestBed.createComponent(EditFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
