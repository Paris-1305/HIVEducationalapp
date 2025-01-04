// src/app/services/userprofile.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile } from '../models/userprofile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  // Declare the userProfiles array to store user profiles
  private userProfiles: UserProfile[] = []; // This can be replaced with an actual database in real-world scenarios

  constructor() {}

  // Method to get user profile by ID
  getUserProfile(userId: string): Observable<UserProfile | undefined> {
    const userProfile = this.userProfiles.find(profile => profile.userId === userId);
    return of(userProfile);
  }

  // Dynamically update the profile vector based on user interaction
  updateUserProfileVector(userProfile: any, page: any, interactionType: string, data: any): any {
    if (!userProfile.profileVector) {
      userProfile.profileVector = [0, 0, 0, 0, 0]; // Default vector if not defined
    }
  
    for (let i = 0; i < userProfile.profileVector.length; i++) {
      userProfile.profileVector[i] += page.contentVector[i] * 0.1; // Weighted update
    }
  
    return userProfile;
  }
  

  // Save the user profile with updated vector
  saveUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    const index = this.userProfiles.findIndex(profile => profile.userId === userProfile.userId);
    if (index !== -1) {
      // Update existing profile
      this.userProfiles[index] = userProfile;
    } else {
      // Add new profile if not found
      this.userProfiles.push(userProfile);
    }
    return of(userProfile); // Return the saved profile
  }
}

