import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-assessment',
  templateUrl: './ai-assessment.component.html',
  styleUrls: ['./ai-assessment.component.css']
})
export class AiAssessmentComponent {

  currentQuestion = 3;
  totalQuestions = 10;

  time = '12:42';

  interviewTitle = 'Software Developer';
  interviewRound = 'Technical Round';

  aiQuestion =
    'Tell me about a project where you faced a difficult technical problem and how you solved it.';

  answer = '';

}