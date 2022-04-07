import browser from "webextension-polyfill";
import { Tab, Tabs, Windows, Commands } from "./types";

export const BrowserUtils = {
    getAllTabs(): Promise<Tab[]> {
        return browser.tabs.query({})
    },

    getStaticTabs(): Tabs.Static {
        return browser.tabs
    },

    getTab(id: number): Promise<Tab> {
        return browser.tabs.get(id)
    },

    getWindows(): Windows.Static {
        return browser.windows
    },

    getTabsOfWindow(windowId: number): Promise<Tab[]> {
        return browser.tabs.query({ windowId })
    },

    getCommands(): Commands.Static {
        return browser.commands
    }
}