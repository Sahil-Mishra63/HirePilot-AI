import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SkillScore {
  icon: string;
  name: string;
  score: number;
  description: string;
}

interface QuestionResult {
  number: number;
  category: string;
  question: string;
  score: number;
  status: string;
}

@Component({
  selector: 'app-result-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultReport.component.html',
  styleUrl: './resultReport.component.scss'
})
export class ResultReportComponent {

  assessmentDate = new Date();

  duration = '18 min 42 sec';

  totalQuestions = 5;

  answeredQuestions = 5;

  overallScore = 82;

  performanceLevel = 'Excellent Performance';

  aiFeedback =
    'You demonstrated strong technical knowledge, good communication skills, and a structured approach to problem solving. Your answers were relevant and confident. To improve further, try using more real-world examples and structure behavioral answers more clearly.';

  skills: SkillScore[] = [
    {
      icon: '💻',
      name: 'Technical Knowledge',
      score: 88,
      description: 'Strong understanding of technical concepts'
    },
    {
      icon: '🧠',
      name: 'Problem Solving',
      score: 84,
      description: 'Good logical thinking and analysis'
    },
    {
      icon: '💬',
      name: 'Communication',
      score: 79,
      description: 'Clear and understandable responses'
    },
    {
      icon: '🎯',
      name: 'Confidence',
      score: 76,
      description: 'Good confidence with room to improve'
    }
  ];

  strengths: string[] = [
    'Strong understanding of core technical concepts',
    'Good logical and structured problem solving',
    'Clear and relevant responses',
    'Positive communication style'
  ];

  improvements: string[] = [
    'Use the STAR method for behavioral questions',
    'Add more real-world examples to technical answers',
    'Keep answers concise before explaining details',
    'Work on maintaining consistent confidence'
  ];

  questionResults: QuestionResult[] = [
    {
      number: 1,
      category: 'Introduction',
      question: 'Tell me about yourself.',
      score: 90,
      status: 'Excellent'
    },
    {
      number: 2,
      category: 'Technical',
      question: 'Explain a challenging technical problem you solved.',
      score: 86,
      status: 'Excellent'
    },
    {
      number: 3,
      category: 'Problem Solving',
      question: 'How would you debug a performance issue?',
      score: 82,
      status: 'Good'
    },
    {
      number: 4,
      category: 'Behavioral',
      question: 'Tell me about a difficult team situation.',
      score: 74,
      status: 'Good'
    },
    {
      number: 5,
      category: 'Technical',
      question: 'How do you approach learning a new technology?',
      score: 78,
      status: 'Good'
    }
  ];

  constructor(private router: Router) {}

  get scoreOffset(): number {
    const circumference = 2 * Math.PI * 88;

    return circumference -
      (circumference * this.overallScore) / 100;
  }

  getStatusClass(status: string): string {

    const value = status.toLowerCase();

    if (value === 'excellent') {
      return 'excellent';
    }

    if (value === 'good') {
      return 'good';
    }

    return 'improvement';
  }

  getScoreClass(score: number): string {

    if (score >= 85) {
      return 'high';
    }

    if (score >= 70) {
      return 'medium';
    }

    return 'low';
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }

  retakeAssessment(): void {
    this.router.navigate(['/assess']);
  }

  downloadReport(): void {
    window.print();
  }
}