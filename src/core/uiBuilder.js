// src/core/uiBuilder.js
// Bouwt de STATISCHE App Shell

export function loadStaticUI(container) {
  // 'return' is cruciaal voor de 'await' in main.js
  return fetch("ui.yml")
    .then((response) => response.text())
    .then((yamlText) => {
      const uiData = jsyaml.load(yamlText);
      container.innerHTML = "";
      buildUI(uiData, container);
    })
    .catch((error) => {
      console.error("Fout bij het laden van de hoofd-YAML (ui.yml):", error);
      throw error; // Gooi fout door naar main.js
    });
}

function buildUI(configArray, parentElement) {
  configArray.forEach((config) => {
    const element = document.createElement(config.tag);

    Object.keys(config).forEach((key) => {
      if (key === "tag" || key === "children" || key === "text") return;
      element.setAttribute(key, config[key]);
    });

    if (config.text) {
      element.textContent = config.text;
    }
    parentElement.appendChild(element);

    if (config.children && Array.isArray(config.children)) {
      buildUI(config.children, element);
    }
  });
}
