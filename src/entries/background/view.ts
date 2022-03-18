import { Tabs, Window } from "./types";

export default class View {

    public get window(): Window {
        return this._window
    }

    
    public get tabs() : Tabs.Static {
        return this._tabs
    }
    

    constructor(private _window: Window, private _tabs: Tabs.Static) {}
}