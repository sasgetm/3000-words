export async function fetchWordsByCategory(activeCategory) {
  const response = await fetch(`http://p99996p5.beget.tech/api/categories/${activeCategory}/words`);
  return response.json();
}

export function fetchWordsByIds(ids) {
  return fetch('http://p99996p5.beget.tech/api/words/by-ids', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  }).then(res => res.json());
}
