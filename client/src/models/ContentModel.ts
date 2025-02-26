export interface IContent {
  id: string;
  page: string;
  section: string;
  title: string;
  content: string;
  updatedAt?: Date;
}

export class ContentModel {
  private contents: IContent[] = [];
  private readonly API_URL = 'http://localhost:5000/api';
  // Geçici token - gerçek uygulamada login sistemi ile alınmalı
  private readonly TEMP_TOKEN = 'temporary-token';

  async fetchContents(): Promise<IContent[]> {
    try {
      const response = await fetch(`${this.API_URL}/content`, {
        headers: {
          'x-auth-token': this.TEMP_TOKEN
        }
      });
      
      if (!response.ok) {
        throw new Error('İçerikler yüklenirken bir hata oluştu');
      }
      
      this.contents = await response.json();
      return this.contents;
    } catch (error) {
      console.error('Error fetching contents:', error);
      throw error;
    }
  }

  async deleteContent(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/content/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': this.TEMP_TOKEN
        }
      });

      if (!response.ok) {
        throw new Error('İçerik silinirken bir hata oluştu');
      }

      this.contents = this.contents.filter(content => content.id !== id);
    } catch (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  }

  async updateContent(id: string, content: Partial<IContent>): Promise<IContent> {
    try {
      const response = await fetch(`${this.API_URL}/content/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.TEMP_TOKEN
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        throw new Error('İçerik güncellenirken bir hata oluştu');
      }

      const updatedContent = await response.json();
      this.contents = this.contents.map(c => 
        c.id === updatedContent.id ? updatedContent : c
      );
      return updatedContent;
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  }

  async createContent(content: Omit<IContent, 'id'>): Promise<IContent> {
    try {
      const response = await fetch(`${this.API_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.TEMP_TOKEN
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        throw new Error('İçerik oluşturulurken bir hata oluştu');
      }

      const newContent = await response.json();
      this.contents.push(newContent);
      return newContent;
    } catch (error) {
      console.error('Error creating content:', error);
      throw error;
    }
  }
} 