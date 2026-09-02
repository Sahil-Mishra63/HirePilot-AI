import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KAN11Component } from './kan11.component';

describe('KAN11Component', () => {
  let component: KAN11Component;
  let fixture: ComponentFixture<KAN11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KAN11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KAN11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
