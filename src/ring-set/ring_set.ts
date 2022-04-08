export default class RingSet<T> {

    get length(): number { return this._set.size };
    private _set: Set<T>

    constructor(initial: Iterable<T> = []) {
        this._set = new Set(initial)
    }

    /**
     * Appends a value to the ring.
     * @param value to append
     */
    append(value: T) {
        this._set.add(value)
    }

    /**
     * Prepends a value to the ring.
     * @param value to prepend
     */
    prepend(value: T) {
        this._set = new Set([value, ...this._set])
    }

    private produceIterator(): Iterator<T> {
        return function*(values: Iterable<T>) {
            const valueList = [...values]
            for (let index = 0;; index++) {
                yield valueList[index % valueList.length]
            }
        }(this._set.values())
    }

    iterator(): Iterator<T> {
        return this.produceIterator()
    }

    /**
     * Calls the given callback for each element.
     * @param callbackfn to call on each element
     * @param thisArg object, that will be referenced with 'this' inside callback
     */
    forEach(callbackfn: (
        value: T,
        index: T,
        set: Set<T>
    ) => void, thisArg?: T): void {
        this._set.forEach(callbackfn, thisArg)
    }
}