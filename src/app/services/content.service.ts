/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) {}

  // Update the content vector based on interaction
  updateContentVector(page: any, interactionType: string) {
    let updatedVector = [...page.contentVector];

    if (interactionType === 'timeSpent') {
      updatedVector[0] += 0.1; // Example: Increment the first dimension if time spent is high
    }
    if (interactionType === 'click') {
      updatedVector[1] += 0.2; // Increment the second dimension for a click
    }

    page.contentVector = updatedVector;
    this.updateContentVectorInDB(page); // Send updated vector to DB
    return page;
  }

  updateContentVectorInDB(page: any) {
    // Send updated contentVector to backend to be stored in DB
    this.http.post('/api/updatePageVector', page).subscribe(response => {
      console.log('Page vector updated successfully!');
    });
  }

  // Get page data by ID (Prevention Page)
  getPageById(pageId: string) {
    return this.http.get(`/api/getPage/${pageId}`);
  }
}
