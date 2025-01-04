// page.model.ts
export interface Page {
    id: string;
    title: string;
    content: string;
    contentVector: number[]; // A vector representing the page's content
  }
  