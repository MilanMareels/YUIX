import { routes } from "../routes/routes.js";

let pageContainer = null;
let navLinks = [];

export function initRouter(containerId) {
  pageContainer = document.getElementById(containerId);
  if (!pageContainer) {
    console.error("Router: page container niet gevonden!");
    return;
  }

  navLinks = document.querySelectorAll('.nav-link[data-action="navigate"]');

  window.addEventListener("popstate", handleRouteChange);

  document.getElementById("app").addEventListener("click", (event) => {
    const target = event.target.closest('[data-action="navigate"]');
    if (target) {
      event.preventDefault();
      const path = target.dataset.path;

      if (path && path !== window.location.pathname) {
        window.history.pushState({}, "", path);
        handleRouteChange();
      }
    }
  });

  handleRouteChange();
}

async function handleRouteChange() {
  let path = window.location.pathname;

  if (!routes[path]) {
    path = "/";
  }

  const renderPage = routes[path];

  if (renderPage) {
    pageContainer.innerHTML = "";
    updateActiveLink(path);

    try {
      await renderPage(pageContainer);
    } catch (error) {
      console.error(`Fout bij renderen van route ${path}:`, error);
      pageContainer.innerHTML = '<p style="color:red;">Pagina kon niet geladen worden.</p>';
    }
  }
}

function updateActiveLink(activePath) {
  navLinks.forEach((link) => {
    if (link.dataset.path === activePath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
