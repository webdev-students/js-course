// Lesson 12.13 — Promise.all
async function request(path) {
  const response = await fetch(`https://dummyjson.com${path}`);
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}
