// src/core/router.js
// De complete router, handelt ook navigatiekliks af

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

  // Luister naar URL hash-veranderingen (back/forward knop)
  window.addEventListener("hashchange", handleRouteChange);

  // VERVANGT eventHandler.js: Luister naar navigatiekliks
  document.getElementById("app").addEventListener("click", (event) => {
    const target = event.target.closest('[data-action="navigate"]');
    if (target) {
      event.preventDefault(); // Voorkom standaard anker-gedrag
      const path = target.dataset.path;
      if (path && window.location.hash !== path) {
        window.location.hash = path;
      }
    }
  });

  // Laad de initiële route
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
