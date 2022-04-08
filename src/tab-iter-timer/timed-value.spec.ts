import { describe, it } from "mocha";
import { expect } from "chai";
import TimedValue from "./timed-value";

const TEST_THRESHOLD = 50

describe("ValueTimer(threshold, value)", () => {
    describe("start()", () => {
        it("should start the timer and release the value after waiting for given amount of time", async () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")
            timedValue.start()

            // waiting for the timer to finish
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined)
                }, TEST_THRESHOLD)
            })
            expect(timedValue.get()).to.equal("DONE")
        })
        it("should NOT release the given value before the timer ended", async () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")
            timedValue.start()

            // waiting for the timer to finish
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined)
                }, 0)
            })
            expect(timedValue.get()).to.equal(undefined)
        })
    })
    describe("get()", () => {
        it("should throw an error if used before the timer started", () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")

            expect(() => timedValue.get()).to.throw()
        })
    })
})