import browser from "webextension-polyfill";
import { BrowserUtils } from "./utils";
import Model from "./model";
import Controller from "./controller";
import View from "./view";

let controllers: { windowId: number, controller: Controller }[] = []

async function start() {
  browser.runtime.onInstalled.addListener(() => {
    console.log("Extension installed")
  })

  for (const window of await BrowserUtils.getWindows().getAll()) {
    const windowId = window.id
    if (windowId) {
      console.log("registering controller")
      // Create MVC System for each window
      const model = new Model(await BrowserUtils.getTabsOfWindow(windowId))
      const view = new View(window, BrowserUtils.getStaticTabs(), BrowserUtils.getCommands())
      const controller = new Controller(model, view)
      // Save controller
      controllers.push({ windowId, controller })
    }
  }

  browser.windows.onRemoved.addListener((windowId) => {
    // Remove controller for corresponding window
    controllers = controllers.filter((item) => item.windowId !== windowId)
  })
}

start()