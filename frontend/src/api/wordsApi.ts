import { api } from './api';
import { Word } from '../types/word';

export function fetchWordsByCategory(categoryId: number): Promise<Word[]> {
  return api.get<Word[]>(`/categories/${categoryId}/words`);
}
