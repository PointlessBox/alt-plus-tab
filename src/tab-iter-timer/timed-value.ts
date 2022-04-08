export default class TimedValue<T> {
    
    private _value: T
    private _done: boolean = false
    private _waiting: NodeJS.Timer | null = null

    /**
     * Returns the given value if the timer is finished, else undefined
     * @returns the timed value or undefined
     */
    get(): T | undefined {
        return this._done ? this._value : undefined
    }
    
    /**
     * Used to release a given value after a timer with a given threshold ended.
     * @param threshold in milliseconds when the timer is finished
     * @param value the value to release after the timer ended
     */
    constructor(private threshold: number, value: T) {
        this._value = value
    }

    /**
     * Starts the timer with
     */
    begin() {
        this._waiting = setInterval(() => {
            this._done = true
            clearInterval(this._waiting!!)
        }, this.threshold)
    }
}