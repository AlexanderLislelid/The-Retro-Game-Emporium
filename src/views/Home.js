import AbstractView from "./AbstractView.js";

export default class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    return `
            <h1>Welcome Home!</h1>
            <p>This is the home page of our Single Page Application.</p>
            <p>Navigate using the links above - notice how the page doesn't reload!</p>
            
  
        `;
  }
}
