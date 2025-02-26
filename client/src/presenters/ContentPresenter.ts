import { ContentModel, IContent } from '../models/ContentModel';
import { IContentView } from '../interfaces/IContentView';

export class ContentPresenter {
  constructor(
    private model: ContentModel,
    public view: IContentView
  ) {}

  async loadContents(): Promise<void> {
    try {
      this.view.showLoading();
      const contents = await this.model.fetchContents();
      this.view.displayContents(contents);
    } catch (error) {
      this.view.showError('İçerikler yüklenirken bir hata oluştu');
    } finally {
      this.view.hideLoading();
    }
  }

  async handleCreateContent(content: Omit<IContent, 'id'>): Promise<void> {
    try {
      this.view.showLoading();
      await this.model.createContent(content);
      await this.loadContents();
    } catch (error) {
      this.view.showError('İçerik oluşturulurken bir hata oluştu');
    } finally {
      this.view.hideLoading();
    }
  }

  async handleUpdateContent(id: string, content: Partial<IContent>): Promise<void> {
    try {
      this.view.showLoading();
      await this.model.updateContent(id, content);
      await this.loadContents();
    } catch (error) {
      this.view.showError('İçerik güncellenirken bir hata oluştu');
    } finally {
      this.view.hideLoading();
    }
  }

  async handleDeleteContent(id: string): Promise<void> {
    try {
      this.view.showLoading();
      await this.model.deleteContent(id);
      await this.loadContents();
    } catch (error) {
      this.view.showError('İçerik silinirken bir hata oluştu');
    } finally {
      this.view.hideLoading();
    }
  }
} 