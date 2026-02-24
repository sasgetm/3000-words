export async function fetchWordsByCategory(activeCategory) {
  const response = await fetch(`http://alexandergetmanets.ru/3000-words/backend/public/api/categories/${activeCategory}/words`);
  return response.json();
}

export function fetchWordsByIds(ids) {
  return fetch('http://alexandergetmanets.ru/3000-words/backend/public/api/words/by-ids', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  }).then(res => res.json());
}
