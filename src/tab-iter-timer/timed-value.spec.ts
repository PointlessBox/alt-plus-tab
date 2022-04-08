import { describe, it } from "mocha";
import { expect } from "chai";
import TimedValue from "./timed-value";

const TEST_THRESHOLD = 50

describe("ValueTimer(threshold, value)", () => {
    describe("begin()", () => {
        it("should start the timer and ", async () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")
            timedValue.begin()

            expect(timedValue.get()).to.equal(undefined)

            // waiting for the timer to finish
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(undefined)
                }, TEST_THRESHOLD)
            })
            expect(timedValue.get()).to.equal("DONE")
        })
    })
})