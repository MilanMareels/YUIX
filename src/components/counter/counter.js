// src/components/counter/counter.js

// HIER ZIT DE FIX: We importeren 'store', niet 'setState/getState'
import { store, setState } from "../../core/store.js";
import { loadTemplate, buildElementFromTemplate } from "../../core/templateBuilder.js";

const TEMPLATE_PATH = "src/components/counter/counter.yml";
let counterTemplate = null;

export async function initCounter(container) {
  // 1. Laad template en bouw element
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

  // Vind het display-element LOKAAL
  const display = element.querySelector("#counter-value");

  // 2. ABONNEER DE UI OP DE STATE
  setState("counterValue", (newValue) => {
    // Zorg dat we 0 tonen i.p.v. 'undefined' bij de start
    display.textContent = newValue || 0;
  });

  // 3. DEFINIEER DE ACTIES (met de 'store' proxy)
  const actions = {
    increment: () => {
      // HIER ZIT DE FIX: Schrijf direct naar de store
      store.counterValue = (store.counterValue || 0) + 1;
    },
    decrement: () => {
      // HIER ZIT DE FIX: Schrijf direct naar de store
      store.counterValue = (store.counterValue || 0) - 1;
    },
  };

  // 4. VOEG DE ALGEMENE LISTENER TOE
  element.addEventListener("click", (event) => {
    const actionName = event.target.dataset.action;
    if (actions[actionName]) {
      actions[actionName]();
    }
  });

  // 5. Voeg toe aan de pagina
  container.innerHTML = "";
  container.appendChild(element);
}
