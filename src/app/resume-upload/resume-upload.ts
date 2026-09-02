import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ResumeResult {
  headline?: string;
  yearsOfExperience?: number;
  technicalSkills: string[];
  education: string[];
  projects: string[];
  experience: string[];
  interviewAreas: string[];
}

type UploadState = 'idle' | 'error' | 'ready' | 'analyzing' | 'complete';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './resume-upload.html',
  styleUrl: './resume-upload.scss'
})
export class ResumeUpload {

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;

  state: UploadState = 'idle';

  errorMessage = '';

  result: ResumeResult | null = null;

  // Change this if your Flask backend uses another port
  private readonly API_URL = 'http://localhost:5000/api/resume/analyze';

  constructor(private http: HttpClient) {}

  /* ---------------- FILE BROWSER ---------------- */

  openFileBrowser(): void {
    this.fileInput.nativeElement.click();
  }

  /* ---------------- FILE SELECT ---------------- */

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.handleFile(input.files[0]);
  }

  /* ---------------- DRAG & DROP ---------------- */

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.state !== 'analyzing') {
      this.state = 'ready';
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.selectedFile && this.state !== 'error') {
      this.state = 'idle';
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.state === 'analyzing') {
      return;
    }

    const files = event.dataTransfer?.files;

    if (!files || files.length === 0) {
      return;
    }

    this.handleFile(files[0]);
  }

  /* ---------------- FILE VALIDATION ---------------- */

  handleFile(file: File): void {

    this.errorMessage = '';
    this.result = null;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const fileName = file.name.toLowerCase();

    const validExtension =
      fileName.endsWith('.pdf') ||
      fileName.endsWith('.doc') ||
      fileName.endsWith('.docx');

    const validType =
      allowedTypes.includes(file.type) || validExtension;

    if (!validType) {
      this.selectedFile = null;
      this.state = 'error';
      this.errorMessage = 'Please upload a PDF, DOC, or DOCX file.';
      return;
    }

    // 5 MB limit
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      this.selectedFile = null;
      this.state = 'error';
      this.errorMessage = 'File size must be less than 5 MB.';
      return;
    }

    this.selectedFile = file;
    this.state = 'ready';
  }

  /* ---------------- ANALYZE RESUME ---------------- */

  analyzeResume(): void {

    if (!this.selectedFile) {
      return;
    }

    this.state = 'analyzing';
    this.errorMessage = '';
    this.result = null;

    const formData = new FormData();

    formData.append('resume', this.selectedFile);

    this.http.post<ResumeResult>(
      this.API_URL,
      formData
    ).subscribe({

      next: (response) => {

        console.log('Resume analysis response:', response);

        this.result = {
          headline: response?.headline || '',
          yearsOfExperience: response?.yearsOfExperience || 0,
          technicalSkills: response?.technicalSkills || [],
          education: response?.education || [],
          projects: response?.projects || [],
          experience: response?.experience || [],
          interviewAreas: response?.interviewAreas || []
        };

        this.state = 'complete';
      },

      error: (error) => {

        console.error('Resume analysis error:', error);

        this.state = 'error';

        if (error.status === 0) {
          this.errorMessage =
            'Unable to connect to the server. Please make sure your Flask backend is running.';
        } else if (error.status === 400) {
          this.errorMessage =
            'The uploaded resume could not be processed. Please try another file.';
        } else {
          this.errorMessage =
            'Something went wrong while analyzing the resume. Please try again.';
        }
      }
    });
  }

  /* ---------------- REMOVE FILE ---------------- */

  removeFile(): void {

    this.selectedFile = null;
    this.result = null;
    this.errorMessage = '';
    this.state = 'idle';

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  /* ---------------- TRY AGAIN ---------------- */

  tryAgain(): void {
    this.removeFile();
    this.openFileBrowser();
  }

  /* ---------------- FILE SIZE ---------------- */

  formatFileSize(bytes: number): string {

    if (bytes === 0) {
      return '0 Bytes';
    }

    const units = ['Bytes', 'KB', 'MB'];

    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    return (
      parseFloat(
        (bytes / Math.pow(1024, index)).toFixed(2)
      ) +
      ' ' +
      units[index]
    );
  }
}