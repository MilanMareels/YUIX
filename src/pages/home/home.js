// src/pages/home/home.js
import { loadTemplate, buildElementFromTemplate } from "../../core/templateBuilder.js";
import { initCounter } from "../../components/counter/counter.js";
import { initTextInput } from "../../components/textInput/textInput.js";

const TEMPLATE_PATH = "src/pages/home/home.yml";
let homeTemplate = null;

export async function renderHomePage(container) {
  if (!homeTemplate) {
    homeTemplate = await loadTemplate(TEMPLATE_PATH);
  }
  const element = buildElementFromTemplate(homeTemplate, {});
  container.appendChild(element);

  // 2. Laad de counter in zijn container
  const counterTarget = element.querySelector("#counter-container");
  if (counterTarget) {
    initCounter(counterTarget);
  }

  // 3. Laad de text input in zijn container
  const textTarget = element.querySelector("#text-container");
  if (textTarget) {
    initTextInput(textTarget);
  }
}
