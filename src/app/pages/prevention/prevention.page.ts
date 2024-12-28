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
export class PreventionPage implements OnInit {

  userProfile: any;
  page: any; // Page object containing contentVector
  timeSpent: number = 0; // Time spent on the page (in seconds)

  constructor(
    private contentService: ContentService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.userProfile = this.userProfileService.getUserProfile("0"); // Get user profile
    this.page = this.contentService.getPageById('prevention'); // Get page details for prevention
  }

  onTimeSpent(seconds: number) {
    this.timeSpent = seconds;
    this.updateContentVector('timeSpent');
    this.updateUserProfileVector();
  }

  onPageClick() {
    this.updateContentVector('click');
    this.updateUserProfileVector();
  }

  updateContentVector(interactionType: string) {
    this.page = this.contentService.updateContentVector(this.page, interactionType);
  }

  updateUserProfileVector() {
    this.userProfile = this.userProfileService.updateUserProfileVector(this.userProfile, this.page);
    this.userProfileService.saveUserProfile(this.userProfile); // Send updated profile to backend
  }
}