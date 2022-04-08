import { describe, it } from "mocha";
import { expect } from "chai";
import TimedValue from "./timed-value";

const TEST_THRESHOLD = 50

const sleep = (millis: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, millis)
    })
}

describe("ValueTimer(threshold, value)", () => {
    describe("start()", () => {
        it("should start the timer and release the value after waiting for given amount of time", async () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")
            timedValue.start()

            // waiting for the timer to finish
            await sleep(TEST_THRESHOLD)
            expect(timedValue.get()).to.equal("DONE")
        })
        it("should NOT release the given value before the timer ended", async () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")
            timedValue.start()

            // waiting for the timer to finish
            await sleep(0)
            expect(timedValue.get()).to.equal(undefined)
        })
    })
    describe("get()", () => {
        it("should throw an error if used before the timer started", () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")

            expect(() => timedValue.get()).to.throw()
        })
    })
    describe("waitLonger()", () => {
        it("should force the value to be hold for one more interval of the given threshold", async () => {
            const timedValue = new TimedValue(TEST_THRESHOLD, "DONE")
            timedValue.start()
            timedValue.waitLonger()

            await sleep(TEST_THRESHOLD + (TEST_THRESHOLD / 2))
            expect(timedValue.get()).to.equal(undefined)
        })
    })
})