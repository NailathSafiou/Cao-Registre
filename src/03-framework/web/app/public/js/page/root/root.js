import { loadAllTab } from "../../shared/tab.js";
import { fetchAndDisplayAllUser } from "./utilisateur.js";

window.addEventListener("load", async () => {
  loadAllTab();
  await fetchAndDisplayAllUser();
})