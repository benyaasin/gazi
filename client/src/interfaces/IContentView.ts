import { IContent } from '../models/ContentModel';

export interface IContentView {
  displayContents(contents: IContent[]): void;
  showError(message: string): void;
  showLoading(): void;
  hideLoading(): void;
  onEditContent(content: IContent): void;
  onDeleteContent(id: string): void;
  onCreateContent(content: Omit<IContent, 'id'>): void;
} 