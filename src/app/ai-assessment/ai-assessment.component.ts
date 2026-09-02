import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface InterviewQuestion {
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
}

@Component({
  selector: 'app-ai-assessment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-assessment.component.html',
  styleUrl: './ai-assessment.component.scss'
})
export class AiAssessmentComponent implements OnInit, OnDestroy {

  // ==============================
  // Interview Questions
  // ==============================

  questions: InterviewQuestion[] = [
    {
      category: 'Introduction',
      difficulty: 'Easy',
      question: 'Tell me about yourself and your background.'
    },
    {
      category: 'Technical',
      difficulty: 'Medium',
      question: 'What is the difference between let, const and var in JavaScript?'
    },
    {
      category: 'Problem Solving',
      difficulty: 'Medium',
      question: 'How would you approach solving a complex programming problem?'
    },
    {
      category: 'Angular',
      difficulty: 'Hard',
      question: 'What are standalone components in Angular and what are their advantages?'
    },
    {
      category: 'Behavioral',
      difficulty: 'Medium',
      question: 'Describe a challenging situation you faced and how you solved it.'
    }
  ];

  // ==============================
  // Interview State
  // ==============================

  currentQuestion = 1;

  totalQuestions = this.questions.length;

  answer = '';

  isRecording = false;

  showEndModal = false;

  // Timer: 10 minutes
  timeRemaining = 10 * 60;

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  // ==============================
  // Lifecycle
  // ==============================

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // ==============================
  // Current Question
  // ==============================

  get question(): InterviewQuestion {
    return this.questions[this.currentQuestion - 1];
  }

  // ==============================
  // Progress
  // ==============================

  get progress(): number {
    if (this.totalQuestions === 0) {
      return 0;
    }

    return (this.currentQuestion / this.totalQuestions) * 100;
  }

  // ==============================
  // Timer
  // ==============================

  get formattedTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;

    return `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  private padNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private startTimer(): void {
    this.stopTimer();

    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.stopTimer();
        this.endInterview();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // ==============================
  // Recording
  // ==============================

  toggleRecording(): void {
    this.isRecording = !this.isRecording;
  }

  // ==============================
  // Next Question
  // ==============================

  nextQuestion(): void {
    if (!this.answer.trim()) {
      return;
    }

    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
      this.answer = '';
    } else {
      this.endInterview();
    }
  }

  // ==============================
  // End Interview
  // ==============================

  endInterview(): void {
    this.stopTimer();
    this.isRecording = false;
    this.showEndModal = true;
  }

  // ==============================
  // Close Modal
  // ==============================

  closeModal(): void {
    this.showEndModal = false;
  }
}