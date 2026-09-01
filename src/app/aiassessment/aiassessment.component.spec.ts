import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiassessmentComponent } from './aiassessment.component';

describe('AiassessmentComponent', () => {
  let component: AiassessmentComponent;
  let fixture: ComponentFixture<AiassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiassessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
