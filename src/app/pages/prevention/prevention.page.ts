import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { UserProfileService } from 'src/app/services/userprofile.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.page.html',
  styleUrls: ['./prevention.page.scss'],
  standalone: true,
 imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})


@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.page.html',
  styleUrls: ['./prevention.page.scss'],
})
export class PreventionPage implements OnInit {
  userProfile: any = null; // User profile object
  pageContent: any = null; // Current page content
  interactionData: { timeSpent: number; clicks: number } = { timeSpent: 0, clicks: 0 };

  constructor(
    private contentService: ContentService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.initializePage();
  }

  initializePage() {
    // Fetch user profile and page content dynamically
    this.userProfileService.getUserProfile('user_id_placeholder').subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.fetchPageContent();
      },
      error: (err) => console.error('Error fetching user profile:', err),
    });
  }

  fetchPageContent() {
    this.contentService.getPageById('prevention').subscribe({
      next: (page) => {
        this.pageContent = page;
      },
      error: (err) => console.error('Error fetching page content:', err),
    });
  }

  // Track user interactions
  trackTimeSpent(seconds: number) {
    this.interactionData.timeSpent += seconds;
    this.updateContentVector('timeSpent', seconds);
    this.updateUserProfileVector('timeSpent', seconds);
  }

  trackClick() {
    this.interactionData.clicks++;
    this.updateContentVector('click', 1); // Example: 1 click
    this.updateUserProfileVector('click', 1);
  }

  updateContentVector(interactionType: string, data: any) {
    if (this.pageContent) {
      this.contentService.updatePageVector(this.pageContent.id, interactionType, data).subscribe({
        next: (updatedPage) => {
          this.pageContent = updatedPage;
          console.log('Content vector updated successfully:', updatedPage);
        },
        error: (err) => console.error('Error updating content vector:', err),
      });
    }
  }

  // Optional: Update user profile vector if necessary
  updateUserProfileVector(interactionType: string, data: any) {
    if (this.userProfile && this.pageContent) {
      this.userProfile = this.userProfileService.updateUserProfileVector(
        this.userProfile,
        this.pageContent,
        interactionType,
        data
      );
  
      this.userProfileService.saveUserProfile(this.userProfile).subscribe({
        next: () => console.log('User profile updated successfully'),
        error: (err) => console.error('Error updating user profile:', err),
      });
    }
  }
  
}