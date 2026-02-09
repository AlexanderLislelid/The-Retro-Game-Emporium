const BASE_URL = "https://v2.api.noroff.dev/old-games";

export async function fetchGames() {
  const response = await fetch(BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return result.data;
}

export async function fetchGameById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const result = await response.json();
  return result.data;
}
