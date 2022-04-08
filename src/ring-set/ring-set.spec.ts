import { describe, it } from "mocha";
import { expect } from "chai";
import RingSet from "./ring_set";

describe("RingSet", () => {
    describe("append(value)", () => {
        it("should append the value if it does NOT exists already", () => {
            const ringSet = new RingSet([1, 2])
            
            ringSet.append(3)
            
            const iterator = ringSet.iterator()
            iterator.next() // skip 1
            iterator.next() // skip 2
            expect(iterator.next().value).to.equal(3)
        })
        it("should remove the given value from it's current position and append it at the end", () => {
            const ringSet = new RingSet([3, 1, 2])
            
            ringSet.append(3)

            ringSet.forEach((val) => console.log(val))

            const iterator = ringSet.iterator()
            expect(iterator.next().value).to.equal(1) // '3' should be moved to end
            expect(iterator.next().value).to.equal(2)
            expect(iterator.next().value).to.equal(3)
            expect(iterator.next().value).to.equal(undefined)
        })
    })
    describe("prepend(value)", () => {
        it("should prepend a value at the start if it does NOT exists already", () => {
            const ringSet = new RingSet([1, 2])

            ringSet.prepend(3)

            const iterator = ringSet.iterator()
            expect(iterator.next().value).to.equal(3) // prepended value
            expect(iterator.next().value).to.equal(1)
            expect(iterator.next().value).to.equal(2)
        })
        it("should remove the given value from it's current position and prepend it at the end", () => {
            const ringSet = new RingSet([2, 3, 1])

            ringSet.prepend(1)

            const iterator = ringSet.iterator()
            expect(iterator.next().value).to.equal(1) // prepended value
            expect(iterator.next().value).to.equal(2)
            expect(iterator.next().value).to.equal(3)
            expect(iterator.next().value).to.equal(undefined) // '1' should be moved to the start
        })
    })
    describe("infiniteIter()", () => {
        it("should iterate over it's elements infinitely", () => {
            const ringSet = new RingSet([1, 2])

            const infIter = ringSet.infiniteIter()

            let next = infIter.next()
            expect(next.value).to.equal(1)
            expect(next.done).to.equal(false)

            next = infIter.next()
            expect(next.value).to.equal(2)
            expect(next.done).to.equal(false)

            next = infIter.next()
            expect(next.value).to.equal(1)
            expect(next.done).to.equal(false)
            
            next = infIter.next()
            expect(next.value).to.equal(2)
            expect(next.done).to.equal(false)
        })
    })
    describe("iterator()", () => {
        it("should iterate over it's elements", () => {
            const ringSet = new RingSet([1, 2])

            const iter = ringSet.iterator()

            let next = iter.next()
            expect(next.value).to.equal(1)
            expect(next.done).to.equal(false)

            next = iter.next()
            expect(next.value).to.equal(2)
            expect(next.done).to.equal(false)

            next = iter.next()
            expect(next.value).to.equal(undefined)
            expect(next.done).to.equal(true)
        })
    })
})