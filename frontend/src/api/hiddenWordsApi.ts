import { api } from './api';
import { Word } from '../types/word';

export function fetchHiddenWords(): Promise<Word[]> {
  return api.get<Word[]>('/hidden-words');
}

export function hideWord(wordId: number): Promise<{ success: boolean }> {
  return api.post<{ success: boolean }>(`/words/${wordId}/hide`);
}

export function unhideWord(wordId: number): Promise<{ success: boolean }> {
  return api.delete<{ success: boolean }>(`/words/${wordId}/hide`);
}
