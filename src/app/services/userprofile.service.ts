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
  updateUserProfileVector(userId: string, interactionType: string): Observable<UserProfile | undefined> {
    const userProfile = this.userProfiles.find(profile => profile.userId === userId);

    if (userProfile) {
      // Update logic based on interaction type
      switch (interactionType) {
        case 'pageTime':
          // Example: Update the vector based on time spent on a page
          userProfile.profileVector[0] += 0.1; // Increase interest in prevention-related topics
          break;
        case 'pageClick':
          // Example: Increase interest in treatment-related topics
          userProfile.profileVector[1] += 0.2;
          break;
        // Add more cases for other types of interactions as necessary
        default:
          break;
      }

      return of(userProfile); // Return updated profile
    }
    return of(undefined); // If the user profile is not found
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
