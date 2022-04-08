export default class RingArraySet<T> {

    get length(): number { return this._set.size };
    private _set: Set<T>

    constructor(initial: Iterable<T> = []) {
        this._set = new Set(initial)
    }

    /**
     * Appends a value to the ring.
     * @param value to append
     */
    append(value: T): RingArraySet<T> {
        if (this._set.has(value))
            this._set.delete(value)
        this._set.add(value)
        return this
    }

    /**
     * Prepends a value to the ring.
     * @param value to prepend
     */
    prepend(value: T): RingArraySet<T> {
        this._set = new Set([value, ...this._set])
        return this
    }

    /**
     * Deletes the given element by checking with === operator
     * @param value to delete
     * @returns this for method-chaining
     */
    delete(value: T): RingArraySet<T> {
        this._set.delete(value)
        return this
    }

    /**
     * Deletes all elements that match the given condition
     * @param condition to delete by
     * @returns this for method-chaining
     */
    deleteBy(condition: (value: T, index?: number) => boolean): RingArraySet<T> {
        const asArray = [...this._set]
        this._set = new Set(asArray.filter((value, index) => !condition(value, index)))
        return this
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

    /**
     * Produces an iterator over all elements currently in this collection
     * @returns an iterator over all elements of this collection
     */
    iterator(): Iterator<T> {
        return this.produceIterator(this._set.values())
    }

    /**
     * Produces an infinite iterator over all elements currently in this collection.
     * This iterator iterates like a ring over this collection and never runs out of values.
     * @returns an iterator over all elements of this collection
     */
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