export async function fetchCategories() {
  const response = await fetch('http://alexandergetmanets.ru/3000-words/backend/public/api/categories');
  return response.json();
}