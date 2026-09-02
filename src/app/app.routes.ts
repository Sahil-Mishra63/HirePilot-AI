import { Routes } from '@angular/router';
import { LandingComponent } from './page/landing/landing.component';
import { AiAssessmentComponent } from './ai-assessment/ai-assessment.component';
import { ResultReportComponent } from './resultReport/resultReport.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'assess', component: AiAssessmentComponent },
    {
    path: 'result-report',
    component: ResultReportComponent
    }

];
