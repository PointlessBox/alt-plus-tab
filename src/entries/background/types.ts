import browser, { Tabs, Windows } from "webextension-polyfill";

type Tab = browser.Tabs.Tab
type Window = browser.Windows.Window

export { Tab, Tabs, Window, Windows }