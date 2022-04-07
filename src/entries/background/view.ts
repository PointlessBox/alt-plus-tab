import { Tabs, Window, Commands } from "./types";

export default class View {

    public get window(): Window {
        return this._window
    }
    
    public get tabs() : Tabs.Static {
        return this._tabs
    }
    
    public get commands() : Commands.Static {
        return this._commands
    }

    constructor(
        private _window: Window,
        private _tabs: Tabs.Static,
        private _commands: Commands.Static
    ) {}
}