import { Routes } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { ResumeUpload } from './resume-upload/resume-upload';
import { AiassessmentComponent } from './aiassessment/aiassessment.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { ProfileComponent } from './page/profile/profile.component';  
import { authGuard } from './core/guards/auth.guard';

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
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  }
];