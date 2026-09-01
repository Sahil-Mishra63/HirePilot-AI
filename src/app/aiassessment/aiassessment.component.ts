import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aiassessment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aiassessment.component.html',
  styleUrl: './aiassessment.component.scss'
})
export class AiassessmentComponent {
  currentQuestion = 3;
  totalQuestions = 10;

  time = '12:42';

  interviewTitle = 'Software Developer';
  interviewRound = 'Technical Round';

  aiQuestion =
    'Tell me about a project where you faced a difficult technical problem and how you solved it.';

  answer = '';
}
