// Abstract View
class AbstractView {
  constructor(params) {
    // params is passed to all views, but only used by views that need it
  }

  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}

// Views
class Home extends AbstractView {
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

class Catalogue extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Catalogue");
  }

  async getHtml() {
    return `
            <h1>Catalogue</h1>
            <p>Render all retro game titles here</p>
        `;
  }
}

class NotFound extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("404 - Page Not Found");
  }

  async getHtml() {
    return `
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <p><a href="/" data-link>Return to Home</a></p>
        `;
  }
}

// Router functions
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1],
  );
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/catalogue", view: Catalogue },
  ];

  const potentialMatches = routes.map((route) => ({
    route: route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null,
  );

  if (!match) {
    match = {
      route: { path: location.pathname, view: NotFound },
      result: [location.pathname],
    };
  }

  // Extract params if the route has any
  const params = getParams(match);

  // Pass params to the view constructor
  const view = new match.route.view(params);
  document.querySelector("#app").innerHTML = await view.getHtml();
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

window.addEventListener("popstate", router);
