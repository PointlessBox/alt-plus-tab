import browser from "webextension-polyfill";
import TimedValue from "~/tab-iter-timer/timed-value";
// import { Message } from "../shared/types";
import Model from "./model";
import { Tab, Tabs } from "./types";
import { BrowserUtils } from "./utils";
import View from "./view";

const RESET_TIME_IN_MILLIS = 500

export default class Controller {

    private activatedByCmd: Tab | null = null
    private beginnerTab: TimedValue<Tab> | null = null

    constructor(
        private _model: Model,
        private _view: View
    ) {
        this.observeTabSelect(this._view.tabs)
        this.observeTabRemove(this._view.tabs)
        this.observeKeybind()
    }

    private observeTabSelect(tabs: Tabs.Static) {
        tabs.onActivated.addListener(async (activeInfo: Tabs.OnActivatedActiveInfoType) => {
            if (activeInfo.previousTabId) {
                const currentTab = await BrowserUtils.getTab(activeInfo.tabId)
                // Check if the given tab was activated by a command
                let wasActivatedByCmd = false
                if (this.activatedByCmd !== null) {
                    const activatedByCmd = this.activatedByCmd
                    wasActivatedByCmd = activatedByCmd.id === currentTab.id
                }
                // If not, then add it to the tab model and reset the current iteration of tabs
                if (!wasActivatedByCmd) {
                    const previousTab = await BrowserUtils.getTab(activeInfo.previousTabId)

                    const windowIdFromTab = previousTab.windowId
                    const windowId = this._view.window.id
                    // If this tab is in the same window as the window that the controller corresponds to then add to model
                    if (windowIdFromTab && windowId && windowId === windowIdFromTab) {
                        this._model.prepend(previousTab)
                    }
                    this._model.resetIteration()
                } else if (this.beginnerTab?.isDone) {
                    this._model.prepend(this.beginnerTab.get()!!)
                }
            }
        })
    }

    private observeTabRemove(tabs: Tabs.Static) {
        tabs.onRemoved.addListener((tabId: number, _removeInfo: Tabs.OnRemovedRemoveInfoType) => {
            this._model.removeTabWithId(tabId)
        })
    }

    private observeKeybind() {
        this._view.commands.onCommand.addListener(async (cmd: string) => {
            if (cmd === "activate") {
                const tab = this._model.currentIteration.next().value
                // this.activatedByCmd = browser.tabs.update(tab.id, { active: true })
                const updatedTab = await browser.tabs.update(tab.id, { active: true })
                this.activatedByCmd = updatedTab
                if (this.beginnerTab !== null) {
                    if (this.beginnerTab.isDone) {
                        this.beginnerTab = new TimedValue(RESET_TIME_IN_MILLIS, updatedTab)
                        this.beginnerTab.start()
                    } else {
                        this.beginnerTab.waitLonger()
                    }
                }
            }
        })
    }
}