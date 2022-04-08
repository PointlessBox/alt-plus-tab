/**
 * Contains the model from MVC Pattern
 */

import RingArraySet from "~/ring-array-set/ring-array-set"
import { Tab } from "./types"

/**
 * Represents the history of tabs that were selected or brought into focus.
 * This history is in reversed chronological order and is represented as a sorted set internally. Meaning no element can exist twice.
 * Visualized in file: 'docs/model_data_structure.png'.
 */
export default class Model {
    /**
     * History of browser tabs represented as a sorted set in reversed chronological order.
     */
    private _state: RingArraySet<Tab> = new RingArraySet()

    private _currentIterator: Generator<Tab> | null = null
    
    public get currentIteration(): Generator<Tab> {
        console.log(this._currentIterator)
        this._currentIterator = this._currentIterator ?? this.produceNewIterator(this._state)
        return this._currentIterator!!
    }
    
    constructor (initial: Tab[]) {
        this._state = new RingArraySet(initial)
    }

    private produceNewIterator(values: Tab[]): Generator<Tab> {
        return function*(values: Tab[]) {
            for (const tab of values)
                yield tab
        }(values)
    }

    resetIteration() {
        this._currentIterator = null
    }

    /**
     * Adds the given tab to the beginning of the history.
     * @param tab Tab to add
     */
    prepend(tab: Tab) {
        if (tab.id) {
            // this.removeTabWithId(tab.id) // Remove the unshifted tab to prevent duplicates
            this._state.prepend(tab)
        }
    }

    removeTabWithId(tabId: number) {
        this._state = this._state.filter((tab: Tab) => {
            tab.id !== tabId
        })
    }
}