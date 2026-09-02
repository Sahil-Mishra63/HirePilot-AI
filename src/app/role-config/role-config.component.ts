import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-role-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-config.component.html',
  styleUrls: ['./role-config.component.scss']
})
export class RoleConfigComponent {

  roles: Role[] = [
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      description: 'Analyze data and build predictive models',
      icon: '📊'
    },
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      description: 'Analyze data and find business insights',
      icon: '📈'
    },
    {
      id: 'full-stack-dev',
      name: 'Full Stack Developer',
      description: 'Build complete web applications',
      icon: '💻'
    },
    {
      id: 'frontend-dev',
      name: 'Frontend Developer',
      description: 'Create modern user interfaces',
      icon: '🎨'
    },
    {
      id: 'backend-dev',
      name: 'Backend Developer',
      description: 'Build APIs and server-side applications',
      icon: '⚙️'
    },
    {
      id: 'ml-engineer',
      name: 'ML Engineer',
      description: 'Build and deploy machine learning systems',
      icon: '🤖'
    },
    {
      id: 'devops-engineer',
      name: 'DevOps Engineer',
      description: 'Manage cloud infrastructure and deployments',
      icon: '☁️'
    },
    {
      id: 'qa-engineer',
      name: 'QA Engineer',
      description: 'Test applications and ensure software quality',
      icon: '🧪'
    }
  ];

  selectedRole: string = 'data-scientist';

  questionCount: number = 10;

  difficulty: 'easy' | 'medium' | 'hard' = 'medium';

  selectRole(roleId: string): void {
    this.selectedRole = roleId;
  }

  generateQuestions(): void {
    console.log({
      role: this.selectedRole,
      questionCount: this.questionCount,
      difficulty: this.difficulty
    });
  }
}
