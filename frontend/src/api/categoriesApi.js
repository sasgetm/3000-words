export async function fetchCategories() {
  const response = await fetch('http://p99996p5.beget.tech/api/categories');
  return response.json();
}