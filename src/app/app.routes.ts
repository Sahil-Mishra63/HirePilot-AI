import { Routes } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { ResumeUpload } from './resume-upload/resume-upload';
import { AiassessmentComponent } from './aiassessment/aiassessment.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'resume-upload',
    component: ResumeUpload,
  },
  {
    path: 'assess',
    component: AiassessmentComponent,
  },
];