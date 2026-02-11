export async function fetchTest() {
  const response = await fetch('http://localhost:8080/api/test');
  return response.json();
}