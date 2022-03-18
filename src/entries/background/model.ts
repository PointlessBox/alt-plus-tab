/**
 * Contains the model from MVC Pattern
 */

import { Tab } from "./types"
import SortedSet from "collections/sorted-set";

// TODO: Choose a good explanation for the representation
/**
 * Represents the history of tabs that were selected or brought into focus.
 * This history is in reversed chronological order and is represented as a sorted set internally. Meaning no element can exist twice.
 * Visualized in file: 'docs/model_data_structure.png'.
 */
export default class Model {
    /**
     * History of browser tabs represented as a sorted set in reversed chronological order.
     */
    private _state: SortedSet.SortedSet<Tab> = new SortedSet()

    public get tabs(): Tab[] {
        return this._state.toArray()
    }
    
    constructor (initial: Tab[]) {
        this._state = SortedSet(initial)
    }

    /**
     * Adds the given tab to the beginning of the history.
     * @param tab Tab to add
     */
    unshift(tab: Tab) {
        this._state.unshift(tab)
    }

    removeTabWithId(tabId: number) {
        this._state = this._state.filter((tab: Tab) => {
            tab.id !== tabId
        })
    }
}