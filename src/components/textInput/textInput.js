import { store, setState } from "../../core/store.js";
import { loadTemplate, buildElementFromTemplate } from "../../core/templateBuilder.js";

const TEMPLATE_PATH = "src/components/textInput/textInput.yml";
let template = null;

export async function initTextInput(container) {
  try {
    if (!template) {
      template = await loadTemplate(TEMPLATE_PATH);
    }
  } catch (error) {
    console.error("Text input template kon niet laden:", error);
    return;
  }
  const element = buildElementFromTemplate(template, {});
  const display = element.querySelector("#text-display");
  const input = element.querySelector("#text-input");

  setState("myText", (newValue) => {
    const value = newValue || "";

    if (display) {
      display.textContent = value;
    }
    if (input && input.value !== value) {
      input.value = value;
    }
  });

  input.addEventListener("input", () => {
    store.myText = input.value;
  });

  container.innerHTML = "";
  container.appendChild(element);
}
