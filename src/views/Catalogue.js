import AbstractView from "./AbstractView.js";
import { fetchAndRenderGames } from "../api.js";

export default class Catalogue extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Catalogue");
  }

  async getHtml() {
    return /* HTML */ `
      <h1>Catalogue!</h1>
      <p>Library of old games will render here</p>
      <div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <button id="fetchGames">Fetch games</button>
    `;
  }

  afterRender() {
    const button = document.getElementById("fetchGames");
    button.addEventListener("click", fetchAndRenderGames);
  }
}
