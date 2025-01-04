import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  getAllPages(): Observable<any[]> {
    return this.http.get<any[]>('/api/getAllPages'); // Ensure this API endpoint returns an array of pages
  }
  constructor(private http: HttpClient) {}

  /**
   * Updates the content vector dynamically based on the interaction type.
   * @param page The page object with its contentVector.
   * @param interactionType The type of interaction ('timeSpent', 'click', etc.).
   * @returns The updated page object.
   */
  updateContentVector(page: any, interactionType: string): any {
    // Initialize contentVector if undefined
    if (!page.contentVector) {
      page.contentVector = [0, 0, 0, 0, 0]; // Default 5-dimensional vector
    }

    // Update vector based on interaction type
    switch (interactionType) {
      case 'timeSpent':
        page.contentVector[0] += 0.1; // Example: Increment the first dimension for time spent
        break;
      case 'click':
        page.contentVector[1] += 0.2; // Increment the second dimension for clicks
        break;
      default:
        console.warn(`Unknown interaction type: ${interactionType}`);
    }

    // Save updated vector to the database
    this.saveContentVector(page);

    return page;
  }

  /**
   * Sends the updated content vector to the backend for persistence.
   * @param page The updated page object.
   */
  saveContentVector(page: any): void {
    this.http.put(`/api/updatePage/${page.id}`, { contentVector: page.contentVector }).subscribe({
      next: () => console.log('Content vector successfully updated.'),
      error: (err) => console.error('Failed to update content vector:', err),
    });
  }
 
  updatePageVector(pageId: string, interactionType: string, data: any) {
    return this.http.post('/api/update-content-vector', {
      pageId,
      interactionType,
      data,
    });
  }
  
  /**
   * Fetches a page by its ID.
   * @param pageId The ID of the page.
   * @returns An Observable with the page data.
   */
  getPageById(pageId: string): Observable<any> {
    return this.http.get(`/api/getPage/${pageId}`);
  }
}

