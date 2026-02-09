import AbstractView from "./AbstractView.js";
import { fetchGameById } from "../api.js";

export default class GameDetails extends AbstractView {
  async getHtml() {
    return `<div id="game-details"></div>`;
  }

  async afterRender() {
    const id = this.params.id;
    const game = await fetchGameById(id);

    const container = document.getElementById("game-details");

    container.innerHTML = `
      <h1>${game.name}</h1>
      <p>${game.description}</p>
      <img src="${game.image?.url}" alt="${game.name}">
    `;
  }
}
