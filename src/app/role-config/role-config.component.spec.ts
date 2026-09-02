import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleConfigComponent } from './role-config.component';

describe('RoleConfigComponent', () => {
  let component: RoleConfigComponent;
  let fixture: ComponentFixture<RoleConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleConfigComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RoleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Data Scientist selected by default', () => {
    expect(component.selectedRole).toBe('data-scientist');
  });

  it('should select a role', () => {
    component.selectRole('ml-engineer');

    expect(component.selectedRole).toBe('ml-engineer');
  });

  it('should have 10 questions by default', () => {
    expect(component.questionCount).toBe(10);
  });

  it('should update difficulty', () => {
    component.difficulty = 'hard';

    expect(component.difficulty).toBe('hard');
  });
});
