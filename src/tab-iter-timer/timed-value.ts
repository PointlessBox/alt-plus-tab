export default class TimedValue<T> {
    
    private _value: T
    private _done: boolean = false
    private _waiting: NodeJS.Timer | null = null
    private _shouldWaitLonger: boolean = false

    /**
     * Returns the given value if the timer is finished, else undefined
     * @returns the timed value or undefined
     * @throws if the timer was not started
     */
    get(): T | undefined {
        if (this._waiting === null)
            throw new Error("Timer was not started. Start timer by calling start()");
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
    start() {
        this._waiting = setInterval(() => {
            if (this._shouldWaitLonger)
                this._shouldWaitLonger = false
            else {
                this._done = true
                clearInterval(this._waiting!!)
            }
        }, this.threshold)
    }


    /**
     * Forces the timer to wait one more [this.threshold] ms of time after the current timer ends.
     * This does not add up, it just prevents the timer from stopping after it should end.
     */
    waitLonger() {
        // Forces this._waiting to take one more round
        this._shouldWaitLonger = true
    }
}