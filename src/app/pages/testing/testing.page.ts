import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { UserProfileService } from 'src/app/services/userprofile.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule]
})
export class TestingPage implements OnInit, OnDestroy {
  testingPage: any = null; // The testing page data
  userProfile: any = null; // The user's profile data
  private interactionStartTime: number = 0; // Timestamp for tracking time spent
  private subscriptions: Subscription[] = []; // Subscriptions to manage observables

  constructor(
    private contentService: ContentService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.interactionStartTime = Date.now(); // Start interaction timer
    this.loadUserProfile();
  }

  ngOnDestroy() {
    this.trackTimeSpent(); // Log interaction when leaving the page
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // Fetch user profile and load the testing page
  loadUserProfile() {
    const userId = '12345'; // Replace with dynamic user ID
    const profileSub = this.userProfileService.getUserProfile(userId).subscribe(
      (profile) => {
        this.userProfile = profile;
        this.loadTestingPage();
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
    this.subscriptions.push(profileSub);
  }

  // Fetch the testing page details
  loadTestingPage() {
    const pageSub = this.contentService.getPageById('testing').subscribe(
      (page) => {
        this.testingPage = page;
      },
      (error) => {
        console.error('Error fetching testing page:', error);
      }
    );
    this.subscriptions.push(pageSub);
  }

  // Track time spent on the page
  trackTimeSpent() {
    const timeSpent = (Date.now() - this.interactionStartTime) / 1000; // Convert to seconds
    this.logInteraction('timeSpent', timeSpent);
  }

  // Handle link clicks on the testing page
  handleLinkClick(linkId: string) {
    this.logInteraction('click', linkId);
  }

  // Log user interactions and update content and profile vectors
  logInteraction(interactionType: string, data?: any) {
    if (!this.testingPage || !this.userProfile) return;

    // Update the content vector
    this.contentService
      .updateContentVector(this.testingPage.id, interactionType)
      .subscribe(
        (response: { message: string }) => {
          console.log(response.message);
        },
        (error: any) => {
          console.error('Error updating content vector:', error);
        }
      );

    // Update the user profile vector
    this.userProfileService
      .updateUserProfileVector(
        this.userProfile.userId,
        this.testingPage.id,
        interactionType,
        data
      )
      .subscribe(
        (response: { message: string }) => {
          console.log('User profile updated successfully');
        },
        (error: any) => {
          console.error('Error updating user profile vector:', error);
        }
      );
  }
}
