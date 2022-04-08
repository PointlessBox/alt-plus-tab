import { describe, it } from "mocha";
import { expect } from "chai";
import RingArraySet from "./ring-array-set";

describe("RingArraySet", () => {
    describe("append(value)", () => {
        it("should append the value if it does NOT exists already", () => {
            const ringArraySet = new RingArraySet([1, 2])
            
            ringArraySet.append(3)
            
            const iterator = ringArraySet.iterator()
            iterator.next() // skip 1
            iterator.next() // skip 2
            expect(iterator.next().value).to.equal(3)
        })
        it("should remove the given value from it's current position and append it at the end", () => {
            const ringArraySet = new RingArraySet([3, 1, 2])
            
            ringArraySet.append(3)

            ringArraySet.forEach((val) => console.log(val))

            const iterator = ringArraySet.iterator()
            expect(iterator.next().value).to.equal(1) // '3' should be moved to end
            expect(iterator.next().value).to.equal(2)
            expect(iterator.next().value).to.equal(3)
            expect(iterator.next().value).to.equal(undefined)
        })
    })
    describe("prepend(value)", () => {
        it("should prepend a value at the start if it does NOT exists already", () => {
            const ringArraySet = new RingArraySet([1, 2])

            ringArraySet.prepend(3)

            const iterator = ringArraySet.iterator()
            expect(iterator.next().value).to.equal(3) // prepended value
            expect(iterator.next().value).to.equal(1)
            expect(iterator.next().value).to.equal(2)
        })
        it("should remove the given value from it's current position and prepend it at the end", () => {
            const ringArraySet = new RingArraySet([2, 3, 1])

            ringArraySet.prepend(1)

            const iterator = ringArraySet.iterator()
            expect(iterator.next().value).to.equal(1) // prepended value
            expect(iterator.next().value).to.equal(2)
            expect(iterator.next().value).to.equal(3)
            expect(iterator.next().value).to.equal(undefined) // '1' should be moved to the start
        })
    })
    describe("infiniteIter()", () => {
        it("should produce each element infinitely in a ring", () => {
            const ringArraySet = new RingArraySet([1, 2])

            const infIter = ringArraySet.infiniteIter()

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
        it("should produce each element once", () => {
            const ringArraySet = new RingArraySet([1, 2])

            const iter = ringArraySet.iterator()

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
    describe("forEach()", () => {
        it("should iterate over it's elements", () => {
            const ringArraySet = new RingArraySet([1, 2])

            const proof: { value1: number, value2: number }[] = []
            ringArraySet.forEach((value1, value2) => {
                proof.push({ value1, value2 })
            })

            expect(proof[0].value1).to.equal(1)
            expect(proof[0].value2).to.equal(1)

            expect(proof[1].value1).to.equal(2)
            expect(proof[1].value2).to.equal(2)
        })
    })
    describe("length", () => {
        it("should be equal to the number of initial elements added", () => {
            const initial = [1, 2]
            const ringArraySet = new RingArraySet(initial)

            // length should equal length of 'initial' because it had no duplicates 
            expect(ringArraySet.length).to.equal(initial.length)
        })
        it("should NOT get longer after appending or preceding a duplicate", () => {
            const initial = [1, 2]
            const ringArraySet = new RingArraySet(initial)

            ringArraySet
                .append(1)
                .append(2)
                .prepend(1)
                .prepend(2)

            expect(ringArraySet.length).to.equal(initial.length)
        })
        it("should get longer after appending or preceding a non-duplicate element", () => {
            const initial = [1, 2]
            const ringArraySet = new RingArraySet(initial)

            ringArraySet
                .append(3)
                .prepend(4)

            expect(ringArraySet.length).to.equal(initial.length + 2)
        })
    })
})