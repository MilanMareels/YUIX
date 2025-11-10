import { renderHomePage } from "../pages/home/home.js";
import { renderAboutPage } from "../pages/about/about.js";

export const routes = {
  "/": renderHomePage,
  "/home": renderHomePage,
  "/about": renderAboutPage,
};
