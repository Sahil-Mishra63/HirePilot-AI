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

  answer = '';
  isRecording = false;

  elapsedSeconds = 12 * 60 + 42;

  showEndModal = false;

  questions: InterviewQuestion[] = [

    {
      category: 'Problem Solving',
      difficulty: 'Medium',
      question:
        'Tell me about a project where you faced a difficult technical problem and how you solved it.'
    },

    {
      category: 'Technical Skills',
      difficulty: 'Medium',
      question:
        'How would you design a scalable REST API for a growing application?'
    },

    {
      category: 'Problem Solving',
      difficulty: 'Medium',
      question:
        'Tell me about a project where you faced a difficult technical problem and how you solved it.'
    },

    {
      category: 'JavaScript',
      difficulty: 'Hard',
      question:
        'What is the difference between synchronous and asynchronous JavaScript?'
    },

    {
      category: 'Database',
      difficulty: 'Medium',
      question:
        'How would you optimize a slow database query?'
    }

  ];

  private timerId?: ReturnType<typeof setInterval>;

  get question(): InterviewQuestion {

    return this.questions[
      (this.currentQuestion - 1) % this.questions.length
    ];

  }

  get progress(): number {

    return Math.round(
      (this.currentQuestion / this.totalQuestions) * 100
    );

  }

  get formattedTime(): string {

    const minutes = Math.floor(
      this.elapsedSeconds / 60
    )
      .toString()
      .padStart(2, '0');

    const seconds = (
      this.elapsedSeconds % 60
    )
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;

  }

  ngOnInit(): void {

    this.timerId = setInterval(() => {

      if (this.elapsedSeconds > 0) {

        this.elapsedSeconds--;

      }

    }, 1000);

  }

  ngOnDestroy(): void {

    if (this.timerId) {

      clearInterval(this.timerId);

    }

  }

  toggleRecording(): void {

    this.isRecording = !this.isRecording;

  }

  nextQuestion(): void {

    if (!this.answer.trim()) {

      return;

    }

    if (this.currentQuestion < this.totalQuestions) {

      this.currentQuestion++;

      this.answer = '';

      this.isRecording = false;

    } else {

      this.showEndModal = true;

    }

  }

  endInterview(): void {

    this.showEndModal = true;

  }

  closeModal(): void {

    this.showEndModal = false;

  }

}
