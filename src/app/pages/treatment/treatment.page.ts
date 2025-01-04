import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonList,IonItem } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { UserProfileService } from 'src/app/services/userprofile.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { UpdateResponse } from '../UpdateResponse.interface';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
  standalone: true,
  imports: [IonContent,IonList,IonItem ,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})



export class TreatmentPage implements OnInit {
  userProfile: any; // Add the user profile property here
  treatmentPage: any; // The treatment page data
  private interactionStartTime: number = 0; // Track time spent
  private subscriptions: Subscription[] = []; // Manage observables

  constructor(
    private contentService: ContentService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.loadTreatmentPage();
    this.interactionStartTime = Date.now(); // Start interaction timer
  }

  ngOnDestroy() {
    this.trackTimeSpent(); // Log interaction when leaving the page
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // Load treatment page data dynamically
  loadTreatmentPage() {
    const pageSub = this.contentService.getPageById('treatment').subscribe((page) => {
      this.treatmentPage = page;
    });
    this.subscriptions.push(pageSub);
  }

  // Track time spent on the page
  trackTimeSpent() {
    const timeSpent = (Date.now() - this.interactionStartTime) / 1000; // Time in seconds
    this.logInteraction('timeSpent', timeSpent);
  }

  // Handle clicks on links and log interactions
  handleLinkClick(linkId: string) {
    this.logInteraction('click', linkId);
  }

  // Log user interactions
 
  logInteraction(interactionType: string, data: any) {
    if (!this.treatmentPage || !this.userProfile) return;
  
    // Dynamically update page interaction vector based on interaction type and data
    this.contentService.updatePageVector(this.treatmentPage.id, interactionType, data)
    .subscribe(
      (response: UpdateResponse) => {  // Explicitly type the response as UpdateResponse
        console.log('Page vector updated successfully:', response.message);  // Accessing 'message' from the typed response
      },
      (error: any) => {
        console.error('Error updating page vector:', error);
      }
    );
  
    // Dynamically update user profile vector based on the current user profile and the page interaction
    const userId = this.userProfile.userId; // Use the dynamically fetched userId
    this.userProfileService.updateUserProfileVector(userId, this.treatmentPage.id, interactionType, data).subscribe(
      (response:any) => {
        console.log('User profile updated successfully:', response.message);
      },
      (error:any) => {
        console.error('Error updating user profile vector:', error);
      }
    );
  }
  

}
