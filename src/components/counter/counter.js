import { store, setState } from "../../core/store.js";
import { loadTemplate, buildElementFromTemplate } from "../../core/templateBuilder.js";

const TEMPLATE_PATH = "src/components/counter/counter.yml";
let counterTemplate = null;

export async function initCounter(container) {
  try {
    if (!counterTemplate) {
      counterTemplate = await loadTemplate(TEMPLATE_PATH);
    }
  } catch (error) {
    console.error("Counter template kon niet laden:", error);
    container.innerHTML = "<p style='color:red'>Counter kon niet laden.</p>";
    return;
  }

  const element = buildElementFromTemplate(counterTemplate, {});

  const display = element.querySelector("#counter-value");

  setState("counterValue", (newValue) => {
    display.textContent = newValue || 0;
  });

  const actions = {
    increment: () => {
      store.counterValue = (store.counterValue || 0) + 1;
    },
    decrement: () => {
      store.counterValue = (store.counterValue || 0) - 1;
    },
  };

  element.addEventListener("click", (event) => {
    const actionName = event.target.dataset.action;
    if (actions[actionName]) {
      actions[actionName]();
    }
  });

  container.innerHTML = "";
  container.appendChild(element);
}
