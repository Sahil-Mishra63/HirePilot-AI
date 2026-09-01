import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-upload.html',
  styleUrl: './resume-upload.scss'
})
export class ResumeUpload {

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;

  isDragging = false;

  isAnalyzing = false;

  skills: string[] = [];


  openFilePicker(): void {
    if (!this.selectedFile) {
      this.fileInput.nativeElement.click();
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }


  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }


  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }


  handleFile(file: File): void {

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const maxSize = 5 * 1024 * 1024;


    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC or DOCX file.');
      return;
    }


    if (file.size > maxSize) {
      alert('File size must be less than 5 MB.');
      return;
    }


    this.selectedFile = file;
    this.skills = [];
  }


  removeFile(): void {

    this.selectedFile = null;
    this.skills = [];

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


  getFileSize(bytes: number): string {

    if (bytes < 1024) {
      return bytes + ' Bytes';
    }

    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }

    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }


  analyzeResume(event: Event): void {

    event.stopPropagation();

    if (!this.selectedFile) {
      return;
    }

    this.isAnalyzing = true;


    // Temporary demo skill extraction
    // Later this will connect to your Flask/AI backend.

    setTimeout(() => {

      this.skills = [
        'Python',
        'Java',
        'SQL',
        'MySQL',
        'HTML',
        'CSS',
        'JavaScript',
        'Flask',
        'Data Analysis',
        'Machine Learning',
        'Git',
        'Problem Solving'
      ];

      this.isAnalyzing = false;

    }, 2000);
  }


  continueToInterview(): void {

    console.log('Starting personalized interview...');

  }

}