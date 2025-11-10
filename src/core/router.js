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

  window.addEventListener("hashchange", handleRouteChange);

  document.getElementById("app").addEventListener("click", (event) => {
    const target = event.target.closest('[data-action="navigate"]');
    if (target) {
      event.preventDefault();
      const path = target.dataset.path;
      if (path && window.location.hash !== path) {
        window.location.hash = path;
      }
    }
  });

  handleRouteChange();
}

async function handleRouteChange() {
  let hash = window.location.hash || "#/home";

  if (!routes[hash]) {
    hash = "#/home";
  }

  const renderPage = routes[hash];

  if (renderPage) {
    pageContainer.innerHTML = "";
    updateActiveLink(hash);

    try {
      await renderPage(pageContainer);
    } catch (error) {
      console.error(`Fout bij renderen van route ${hash}:`, error);
      pageContainer.innerHTML = '<p style="color:red;">Pagina kon niet geladen worden.</p>';
    }
  }
}

function updateActiveLink(activeHash) {
  navLinks.forEach((link) => {
    if (link.dataset.path === activeHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
