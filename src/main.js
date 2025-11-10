import { loadStaticUI } from "./core/uiBuilder.js";
import { initRouter } from "./core/router.js";

document.addEventListener("DOMContentLoaded", async () => {
  const appContainer = document.getElementById("app");
  if (!appContainer) {
    console.error("FATAL: #app container niet gevonden!");
    return;
  }

  try {
    await loadStaticUI(appContainer);

    initRouter("page-content");
  } catch (error) {
    console.error("Kon de app niet initialiseren:", error);
    appContainer.innerHTML = "<p style='color:red;'>App kon niet laden. Check console.</p>";
  }
});
