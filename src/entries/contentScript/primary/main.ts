import renderContent from "../renderContent";
import logo from "~/assets/logo.svg";
import "./style.css";
import browser from "webextension-polyfill";
import { Message } from "~/entries/shared/types";

renderContent(
  import.meta.CURRENT_CONTENT_SCRIPT_CSS_URL,
  (appRoot: HTMLElement) => {
    const logoImageUrl = new URL(logo, import.meta.url).href;

    appRoot.innerHTML = `
    <div class="logo">
      <img src="${logoImageUrl}" height="50" alt="" />
    </div>
  `;
  }
);

document.addEventListener("keydown", async (ev: KeyboardEvent) => {
  console.log("keydown")
  const windowId = await (await browser.windows.getCurrent()).id
  browser.runtime.sendMessage({ windowId, event: ev } as Message)
})