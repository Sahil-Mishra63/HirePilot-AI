```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeUploadComponent } from './resume-upload.component';
import { By } from '@angular/platform-browser';

describe('ResumeUploadComponent', () => {

  let component: ResumeUploadComponent;
  let fixture: ComponentFixture<ResumeUploadComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ResumeUploadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeUploadComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  // ----------------------------------------
  // Component Creation
  // ----------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // ----------------------------------------
  // Initial State
  // ----------------------------------------

  it('should start in idle state', () => {
    expect(component.state).toBe('idle');
    expect(component.selectedFile).toBeNull();
    expect(component.result).toBeNull();
  });


  // ----------------------------------------
  // Open File Browser
  // ----------------------------------------

  it('should open the file browser', () => {

    const input =
      fixture.debugElement.query(
        By.css('input[type="file"]')
      ).nativeElement as HTMLInputElement;

    spyOn(input, 'click');

    component.openFileBrowser();

    expect(input.click).toHaveBeenCalled();
  });


  // ----------------------------------------
  // Valid PDF Upload
  // ----------------------------------------

  it('should accept a valid PDF file', () => {

    const file = new File(
      ['resume content'],
      'resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
    expect(component.state).toBe('ready');
    expect(component.errorMessage).toBe('');
  });


  // ----------------------------------------
  // Valid DOC Upload
  // ----------------------------------------

  it('should accept a valid DOC file', () => {

    const file = new File(
      ['resume content'],
      'resume.doc',
      {
        type: 'application/msword'
      }
    );

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
    expect(component.state).toBe('ready');
  });


  // ----------------------------------------
  // Valid DOCX Upload
  // ----------------------------------------

  it('should accept a valid DOCX file', () => {

    const file = new File(
      ['resume content'],
      'resume.docx',
      {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    );

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
    expect(component.state).toBe('ready');
  });


  // ----------------------------------------
  // Invalid File Type
  // ----------------------------------------

  it('should reject an invalid file type', () => {

    const file = new File(
      ['image'],
      'resume.jpg',
      {
        type: 'image/jpeg'
      }
    );

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.state).toBe('error');
    expect(component.selectedFile).toBeNull();

    expect(component.errorMessage).toContain(
      'Invalid file type'
    );
  });


  // ----------------------------------------
  // File Too Large
  // ----------------------------------------

  it('should reject a file larger than 5 MB', () => {

    const largeContent = new Uint8Array(
      5 * 1024 * 1024 + 1
    );

    const file = new File(
      [largeContent],
      'large-resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.state).toBe('error');

    expect(component.errorMessage).toContain(
      'File is too large'
    );
  });


  // ----------------------------------------
  // No File Selected
  // ----------------------------------------

  it('should do nothing when no file is selected', () => {

    const event = {
      target: {
        files: []
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.state).toBe('idle');
    expect(component.selectedFile).toBeNull();
  });


  // ----------------------------------------
  // Drag Over
  // ----------------------------------------

  it('should set drag over state', () => {

    const event = new DragEvent('dragover');

    spyOn(event, 'preventDefault');

    component.onDragOver(event);

    expect(event.preventDefault)
      .toHaveBeenCalled();

    expect(component.isDragOver)
      .toBeTrue();
  });


  // ----------------------------------------
  // Drag Leave
  // ----------------------------------------

  it('should remove drag over state', () => {

    component.isDragOver = true;

    const event = new DragEvent('dragleave');

    spyOn(event, 'preventDefault');

    component.onDragLeave(event);

    expect(event.preventDefault)
      .toHaveBeenCalled();

    expect(component.isDragOver)
      .toBeFalse();
  });


  // ----------------------------------------
  // Drop Valid File
  // ----------------------------------------

  it('should accept a valid dropped file', () => {

    const file = new File(
      ['resume'],
      'resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);

    const event = new DragEvent('drop', {
      dataTransfer
    });

    spyOn(event, 'preventDefault');

    component.onDrop(event);

    expect(event.preventDefault)
      .toHaveBeenCalled();

    expect(component.isDragOver)
      .toBeFalse();

    expect(component.selectedFile)
      .toBe(file);

    expect(component.state)
      .toBe('ready');
  });


  // ----------------------------------------
  // Analyze Resume
  // ----------------------------------------

  it('should change state to analyzing', () => {

    const file = new File(
      ['resume'],
      'resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    component.selectedFile = file;
    component.state = 'ready';

    jasmine.clock().install();

    component.analyzeResume();

    expect(component.state)
      .toBe('analyzing');

    jasmine.clock().tick(2500);

    expect(component.state)
      .toBe('complete');

    expect(component.result)
      .not.toBeNull();

    jasmine.clock().uninstall();
  });


  // ----------------------------------------
  // Analyze Without File
  // ----------------------------------------

  it('should not analyze when no file is selected', () => {

    component.selectedFile = null;
    component.state = 'idle';

    component.analyzeResume();

    expect(component.state)
      .toBe('idle');

    expect(component.result)
      .toBeNull();
  });


  // ----------------------------------------
  // Remove File
  // ----------------------------------------

  it('should remove the selected file', () => {

    component.selectedFile = new File(
      ['resume'],
      'resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    component.state = 'ready';

    component.removeFile();

    expect(component.selectedFile)
      .toBeNull();

    expect(component.result)
      .toBeNull();

    expect(component.state)
      .toBe('idle');

    expect(component.errorMessage)
      .toBe('');
  });


  // ----------------------------------------
  // Try Again
  // ----------------------------------------

  it('should reset the component when trying again', () => {

    component.selectedFile = new File(
      ['resume'],
      'resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    component.state = 'complete';

    component.result = {
      headline: 'Full Stack Developer',
      yearsOfExperience: 1,
      groups: []
    };

    spyOn(component, 'openFileBrowser');

    component.tryAgain();

    expect(component.selectedFile)
      .toBeNull();

    expect(component.result)
      .toBeNull();

    expect(component.state)
      .toBe('idle');

    expect(component.openFileBrowser)
      .toHaveBeenCalled();
  });


  // ----------------------------------------
  // File Size - Bytes
  // ----------------------------------------

  it('should format bytes correctly', () => {

    expect(
      component.formatFileSize(500)
    ).toBe('500 Bytes');
  });


  // ----------------------------------------
  // File Size - KB
  // ----------------------------------------

  it('should format KB correctly', () => {

    expect(
      component.formatFileSize(1024)
    ).toBe('1.0 KB');
  });


  // ----------------------------------------
  // File Size - MB
  // ----------------------------------------

  it('should format MB correctly', () => {

    expect(
      component.formatFileSize(1024 * 1024)
    ).toBe('1.0 MB');
  });


  // ----------------------------------------
  // Zero Bytes
  // ----------------------------------------

  it('should format zero bytes correctly', () => {

    expect(
      component.formatFileSize(0)
    ).toBe('0 Bytes');
  });


  // ----------------------------------------
  // Error Reset
  // ----------------------------------------

  it('should clear the error when a valid file is uploaded', () => {

    component.state = 'error';

    component.errorMessage =
      'Invalid file type.';

    const file = new File(
      ['resume'],
      'resume.pdf',
      {
        type: 'application/pdf'
      }
    );

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    expect(component.errorMessage)
      .toBe('');

    expect(component.state)
      .toBe('ready');
  });

});
```
