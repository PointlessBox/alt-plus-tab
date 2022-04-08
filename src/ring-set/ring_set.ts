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
        if (this._set.has(value))
            this._set.delete(value)
        this._set.add(value)
    }

    /**
     * Prepends a value to the ring.
     * @param value to prepend
     */
    prepend(value: T) {
        this._set = new Set([value, ...this._set])
    }

    private produceIterator(values: Iterable<T>, infinite: Boolean = false): Iterator<T> {
        let iter: Iterator<T> = infinite
            ? function*(values: Iterable<T>) {
                const valueList = [...values]
                for (let index = 0;; index++) {
                    yield valueList[index % valueList.length]
                }
            }(values)
            : function*(values: Iterable<T>) {
                for (const value of values) {
                    yield value
                }
            }(values)
        return iter
    }

    iterator(): Iterator<T> {
        return this.produceIterator(this._set.values())
    }

    infiniteIter(): Iterator<T> {
        return this.produceIterator(this._set.values(), true)
    }

    /**
     * Calls the given callback for each element.
     * @param callbackfn to call on each element
     * @param thisArg object, that will be referenced with 'this' inside callback
     */
    forEach(callbackfn: (
        value1: T,
        value2: T,
        set: Set<T>
    ) => void, thisArg?: T): void {
        this._set.forEach(callbackfn, thisArg)
    }
}