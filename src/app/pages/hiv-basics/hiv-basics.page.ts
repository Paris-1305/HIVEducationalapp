import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonButton, IonToolbar } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { UserProfileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'app-hiv-basics',
  templateUrl: './hiv-basics.page.html',
  styleUrls: ['./hiv-basics.page.scss'],
  standalone: true,
  imports: [IonContent,IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HivBasicsPage implements OnInit {
  userProfile: any; // User profile object
  pageContent: any; // Content for the page (HIV Basics)
  timeSpent: number = 0; // Time spent on the page (in seconds)

  constructor(
    private contentService: ContentService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    // Fetch the user profile
    this.userProfileService.getUserProfile("0").subscribe((profile) => {
      this.userProfile = profile;

      // Fetch the content for the "HIV Basics" page
      this.contentService.getPageById('hivBasics').subscribe((page) => {
        this.pageContent = page;
      });
    });
  }

  // Track time spent on the page
  onTimeSpent(seconds: number) {
    this.timeSpent = seconds;
    this.updateContentVector('timeSpent');
    this.updateUserProfileVector();
  }

  // Track user click events on the page
  onPageClick() {
    this.updateContentVector('click');
    this.updateUserProfileVector();
  }

  // Update the content vector based on user interactions
  updateContentVector(interactionType: string) {
    this.pageContent = this.contentService.updateContentVector(this.pageContent, interactionType);
  }

  // Update the user profile vector based on interactions
  updateUserProfileVector() {
    if (this.userProfile && this.pageContent) {
      // Update the user profile vector based on the content interaction
      this.userProfile = this.userProfileService.updateUserProfileVector(this.userProfile, this.pageContent, 'interaction', { timeSpent: this.timeSpent });
      this.userProfileService.saveUserProfile(this.userProfile).subscribe({
        next: () => console.log('User profile updated successfully'),
        error: (err) => console.error('Error updating user profile:', err),
      });
    }
  }
}
