import { describe, it } from "mocha";
import { expect } from "chai";
import RingSet from "./ring_set";

describe("RingSet", () => {
    describe("if a value does not already exist in the RingSet", () => {
        describe("append(value)", () => {
            it("should append the value", () => {
                const ringSet = new RingSet([1, 2])
                
                ringSet.append(3)
                
                const iterator = ringSet.iterator()
                iterator.next() // skip 1
                iterator.next() // skip 2
                expect(iterator.next().value).to.equal(3)
            })
        })
        describe("prepend(value)", () => {
            it("should prepend a value at the start", () => {
                const ringSet = new RingSet([1, 2])

                ringSet.prepend(3)

                const iterator = ringSet.iterator()
                expect(iterator.next().value).to.equal(3) // prepended value
                expect(iterator.next().value).to.equal(1)
                expect(iterator.next().value).to.equal(2)
            })
        })
    })
})