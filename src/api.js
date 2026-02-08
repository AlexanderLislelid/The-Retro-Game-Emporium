const BASE_URL = "https://v2.api.noroff.dev/old-games";

export async function fetchAndRenderGames() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error, "something went wrong");
  }
}
