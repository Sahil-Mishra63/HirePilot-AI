import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  ProfileService,
  Profile,
  ProfileUpdate
} from '../../core/services/profile.service';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profile: Profile | null = null;

  loading = true;
  saving = false;

  errorMessage = '';
  successMessage = '';

  isEditing = false;

  editData: ProfileUpdate = {
    name: '',
    bio: '',
    phone: '',
    targetRole: '',
    profileImage: ''
  };

  stats = {
    totalInterviews: 12,
    averageScore: 78,
    bestScore: 92
  };

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {

    this.loading = true;

    this.profileService.getProfile().subscribe({

      next: (profile) => {

        this.profile = profile;

        this.editData = {
          name: profile.name || '',
          bio: profile.bio || '',
          phone: profile.phone || '',
          targetRole: profile.targetRole || '',
          profileImage: profile.profileImage || ''
        };

        this.loading = false;
      },

      error: (error) => {

        console.error('Profile error:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load your profile.';
      }
    });
  }

  startEditing(): void {

    if (!this.profile) {
      return;
    }

    this.editData = {
      name: this.profile.name || '',
      bio: this.profile.bio || '',
      phone: this.profile.phone || '',
      targetRole: this.profile.targetRole || '',
      profileImage: this.profile.profileImage || ''
    };

    this.isEditing = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEditing(): void {

    this.isEditing = false;

    this.successMessage = '';
    this.errorMessage = '';
  }

  saveProfile(): void {

    if (!this.editData.name.trim()) {

      this.errorMessage = 'Name cannot be empty.';
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.profileService.updateProfile(this.editData).subscribe({

      next: (updatedProfile) => {

        this.profile = updatedProfile;

        this.isEditing = false;
        this.saving = false;

        this.successMessage = 'Profile updated successfully! 🎉';
      },

      error: (error) => {

        console.error('Update profile error:', error);

        this.saving = false;
        this.errorMessage = 'Unable to update your profile.';
      }
    });
  }

  getProfileCompletion(): number {

    if (!this.profile) {
      return 0;
    }

    let completed = 0;
    const total = 5;

    if (this.profile.name) completed++;
    if (this.profile.email) completed++;
    if (this.profile.bio) completed++;
    if (this.profile.phone) completed++;
    if (this.profile.targetRole) completed++;

    return Math.round((completed / total) * 100);
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}