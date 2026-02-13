export async function fetchWordsByCategory(activeCategory) {
  const response = await fetch(`http://localhost:8080/api/categories/${activeCategory}/words`);
  return response.json();
}
