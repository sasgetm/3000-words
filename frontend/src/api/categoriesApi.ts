import { api } from './api';
import { Category } from '../types/category';

export function fetchCategories(): Promise<Category[]> {
  return api.get<Category[]>('/categories');
}
