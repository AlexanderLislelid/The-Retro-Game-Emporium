import AbstractView from "./AbstractView.js";
import { fetchGames } from "../api.js";

export default class Catalogue extends AbstractView {
  async getHtml() {
    return `
      <h1>Catalogue!</h1>
      <div id="container"></div>
    `;
  }

  async afterRender() {
    const container = document.getElementById("container");
    const games = await fetchGames();
    container.className = "game-cards-container";

    container.innerHTML = games
      .map(
        (game) => /* HTML */ `
          <div class="card">
            <div>
              <h2>${game.name}</h2>
              <p><strong>${game.released}</strong></p>
              <button
                type="button"
                class="btn btn-info details-btn"
                data-id="${game.id}"
              >
                Info
              </button>
            </div>
            <p>${game.description}</p>
            <img
              src=""
              alt="${game.name}"
              data-src="${game.image?.url}"
              class="lazy-load"
            />
          </div>
        `,
      )
      .join("");
    container.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;

        history.pushState(null, null, `/game/${id}`);
        window.dispatchEvent(new PopStateEvent("popstate")); // triggar routeren
      });
    });

    const lazyImages = container.querySelectorAll("img.lazy-load");
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target;

        // hopp over viss data-src er tom (manglar bilde)
        if (!img.dataset.src) {
          obs.unobserve(img);
          return;
        }

        img.src = img.dataset.src;
        img.classList.remove("lazy-load");
        obs.unobserve(img);
      });
    }, observerOptions);

    lazyImages.forEach((img) => observer.observe(img));
  }
}
