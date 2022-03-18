import Model from "./model";
import { Tabs } from "./types";
import { BrowserUtils } from "./utils";
import View from "./view";

export default class Controller {

    constructor(
        private _model: Model,
        private _view: View
    ) {
        this.observeTabSelect(this._view.tabs)
        this.observeTabRemove(this._view.tabs)
    }

    private observeTabSelect(tabs: Tabs.Static) {
        tabs.onHighlighted.addListener(async (highlightInfo: Tabs.OnHighlightedHighlightInfoType) => {
            const tab = await BrowserUtils.getTab(highlightInfo.tabIds[0])
            const windowIdFromTab = tab.windowId
            const windowId = this._view.window.id
            // If this tab is in the same window as the window that the controller corresponds to then add to model
            if (windowIdFromTab && windowId && windowId === windowIdFromTab) {
                this._model.unshift(tab)
            }
        })
    }

    private observeTabRemove(tabs: Tabs.Static) {
        tabs.onRemoved.addListener(async (tabId: number, _removeInfo: Tabs.OnRemovedRemoveInfoType) => {
            this._model.removeTabWithId(tabId)
        })
    }

    // private observeKeybind()
}