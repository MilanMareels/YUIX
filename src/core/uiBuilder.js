export function loadStaticUI(container) {
  return fetch("ui.yml")
    .then((response) => response.text())
    .then((yamlText) => {
      const uiData = jsyaml.load(yamlText);
      container.innerHTML = "";
      buildUI(uiData, container);
    })
    .catch((error) => {
      console.error("Fout bij het laden van de hoofd-YAML (ui.yml):", error);
      throw error;
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
