import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { UserProfileService } from 'src/app/services/userprofile.service';
import { Page } from 'src/app/models/page';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecommendationPage implements OnInit {
  recommendations: Page[] = [];
  userProfile: any; // User's profile data
  userId: string|undefined ; // Example user ID, this should be dynamically fetched

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((userProfile) => {
      this.userProfile = userProfile.profile;
      this.userId = userProfile.profile.userId;
      this.generateRecommendations();
    });
  }

  // Generate recommendations based on user profile and page vectors
  generateRecommendations() {
    this.contentService.getAllPages().subscribe((pages) => {
      this.recommendations = pages
        .map((page) => ({
          ...page,
          similarity: this.calculateCosineSimilarity(
            this.userProfile.profileVector,
            page.contentVector
          ),
        }))
        .sort((a, b) => b.similarity - a.similarity); // Sort by similarity descending
    });
  }

  // Calculate cosine similarity between two vectors
  calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
    const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

}