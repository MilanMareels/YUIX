const templateCache = new Map();

export async function loadTemplate(path) {
  if (templateCache.has(path)) {
    return templateCache.get(path);
  }

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Template niet gevonden (404): ${path}`);
    }
    const yamlText = await response.text();
    const config = jsyaml.load(yamlText);
    templateCache.set(path, config);
    return config;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function buildElementFromTemplate(config, data) {
  if (!config || !config.tag) {
    console.error("Foute template config (waarschijnlijk een array ipv object):", config);
    return document.createElement("div");
  }

  const element = document.createElement(config.tag);

  Object.keys(config).forEach((key) => {
    if (key === "tag" || key === "children" || key === "text") return;
    const interpolatedValue = interpolate(config[key], data);
    element.setAttribute(key, interpolatedValue);
  });

  if (config.text) {
    element.textContent = interpolate(config.text, data);
  }

  if (config.children && Array.isArray(config.children)) {
    config.children.forEach((childConfig) => {
      const childElement = buildElementFromTemplate(childConfig, data);
      element.appendChild(childElement);
    });
  }
  return element;
}

function interpolate(text, data) {
  if (typeof text !== "string") {
    return text;
  }
  return text.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    const keyName = key.trim();
    return data[keyName] !== undefined ? data[keyName] : match;
  });
}
