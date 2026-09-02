import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  phone: string | null;
  targetRole: string | null;
  profileImage: string | null;
}

export interface ProfileUpdate {
  name: string;
  bio: string;
  phone: string;
  targetRole: string;
  profileImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API_URL =
    'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {

    return this.http.get<Profile>(
      this.API_URL
    );
  }

  updateProfile(
    data: ProfileUpdate
  ): Observable<Profile> {

    return this.http.put<Profile>(
      this.API_URL,
      data
    );
  }
}