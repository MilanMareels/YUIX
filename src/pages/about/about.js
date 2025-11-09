// src/pages/about/about.js
import { loadTemplate, buildElementFromTemplate } from "../../core/templateBuilder.js";
import { getState } from "../../core/store.js";
// Pad naar de zojuist gemaakte YAML
const TEMPLATE_PATH = "src/pages/about/about.yml";
let aboutTemplate = null;

// De render-functie die de router gaat aanroepen
export async function renderAboutPage(container) {
  if (!aboutTemplate) {
    aboutTemplate = await loadTemplate(TEMPLATE_PATH);
  }

  const element = buildElementFromTemplate(aboutTemplate, {});
  container.appendChild(element);

  const displayElement = element.querySelector("#about-page-text-display");

  if (displayElement) {
    const huidigeTekst = getState("myText");
    displayElement.textContent = huidigeTekst;
  }
}
