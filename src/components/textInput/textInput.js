// src/components/textInput/textInput.js
import { store, setState } from "../../core/store.js";
import { loadTemplate, buildElementFromTemplate } from "../../core/templateBuilder.js";

const TEMPLATE_PATH = "src/components/textInput/textInput.yml";
let template = null;

export async function initTextInput(container) {
  // 1. Laad template
  try {
    if (!template) {
      template = await loadTemplate(TEMPLATE_PATH);
    }
  } catch (error) {
    console.error("Text input template kon niet laden:", error);
    return;
  }
  const element = buildElementFromTemplate(template, {});

  // 2. Vind de lokale elementen
  const display = element.querySelector("#text-display");
  const input = element.querySelector("#text-input");

  // 3. Abonneer de UI op de (nog niet-bestaande) state 'myText'
  setState("myText", (newValue) => {
    const value = newValue || ""; // Zorg dat het geen 'undefined' is

    if (display) {
      display.textContent = value;
    }
    // Zorg dat de input ook up-to-date is
    if (input && input.value !== value) {
      input.value = value;
    }
  });

  // 4. Koppel de 'input' event van het veld aan de store
  input.addEventListener("input", () => {
    // SCHRIJF direct naar de (niet-geregistreerde) state.
    // De Proxy maakt dit "on the fly" aan.
    store.myText = input.value;
  });

  // 5. Voeg toe aan pagina
  container.innerHTML = "";
  container.appendChild(element);
}
