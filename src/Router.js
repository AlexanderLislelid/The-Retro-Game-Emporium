import Home from "./views/Home.js";
import Catalogue from "./views/Catalogue.js";
import NotFound from "./views/NotFoundView.js";

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
    route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));

  let match = potentialMatches.find((m) => m.result !== null);

  if (!match) {
    match = {
      route: { path: location.pathname, view: NotFound },
      result: [location.pathname],
    };
  }

  const params = getParams(match);

  const view = new match.route.view(params);
  document.querySelector("#app").innerHTML = await view.getHtml();

  if (typeof view.afterRender === "function") {
    view.afterRender();
  }
};

export function initRouter() {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    navigateTo(link.href);
  });

  window.addEventListener("popstate", router);

  router();
}
