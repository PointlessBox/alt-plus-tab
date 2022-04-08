"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var ring_set_1 = require("./ring_set");
(0, mocha_1.describe)("RingSet", function () {
    (0, mocha_1.describe)("append(value)", function () {
        (0, mocha_1.it)("should append the value if it does NOT exists already", function () {
            var ringSet = new ring_set_1.default([1, 2]);
            ringSet.append(3);
            var iterator = ringSet.iterator();
            iterator.next(); // skip 1
            iterator.next(); // skip 2
            (0, chai_1.expect)(iterator.next().value).to.equal(3);
        });
        (0, mocha_1.it)("should remove the given value from it's current position and append it at the end", function () {
            var ringSet = new ring_set_1.default([3, 1, 2]);
            ringSet.append(3);
            ringSet.forEach(function (val) { return console.log(val); });
            var iterator = ringSet.iterator();
            (0, chai_1.expect)(iterator.next().value).to.equal(1); // '3' should be moved to end
            (0, chai_1.expect)(iterator.next().value).to.equal(2);
            (0, chai_1.expect)(iterator.next().value).to.equal(3);
            (0, chai_1.expect)(iterator.next().value).to.equal(undefined);
        });
    });
    (0, mocha_1.describe)("prepend(value)", function () {
        (0, mocha_1.it)("should prepend a value at the start if it does NOT exists already", function () {
            var ringSet = new ring_set_1.default([1, 2]);
            ringSet.prepend(3);
            var iterator = ringSet.iterator();
            (0, chai_1.expect)(iterator.next().value).to.equal(3); // prepended value
            (0, chai_1.expect)(iterator.next().value).to.equal(1);
            (0, chai_1.expect)(iterator.next().value).to.equal(2);
        });
        (0, mocha_1.it)("should remove the given value from it's current position and prepend it at the end", function () {
            var ringSet = new ring_set_1.default([2, 3, 1]);
            ringSet.prepend(1);
            var iterator = ringSet.iterator();
            (0, chai_1.expect)(iterator.next().value).to.equal(1); // prepended value
            (0, chai_1.expect)(iterator.next().value).to.equal(2);
            (0, chai_1.expect)(iterator.next().value).to.equal(3);
            (0, chai_1.expect)(iterator.next().value).to.equal(undefined); // '1' should be moved to the start
        });
    });
    (0, mocha_1.describe)("infiniteIter()", function () {
        (0, mocha_1.it)("should iterate over it's elements infinitely", function () {
            var ringSet = new ring_set_1.default([1, 2]);
            var infIter = ringSet.infiniteIter();
            var next = infIter.next();
            (0, chai_1.expect)(next.value).to.equal(1);
            (0, chai_1.expect)(next.done).to.equal(false);
            next = infIter.next();
            (0, chai_1.expect)(next.value).to.equal(2);
            (0, chai_1.expect)(next.done).to.equal(false);
            next = infIter.next();
            (0, chai_1.expect)(next.value).to.equal(1);
            (0, chai_1.expect)(next.done).to.equal(false);
            next = infIter.next();
            (0, chai_1.expect)(next.value).to.equal(2);
            (0, chai_1.expect)(next.done).to.equal(false);
        });
    });
    (0, mocha_1.describe)("iterator()", function () {
        (0, mocha_1.it)("should iterate over it's elements", function () {
            var ringSet = new ring_set_1.default([1, 2]);
            var iter = ringSet.iterator();
            var next = iter.next();
            (0, chai_1.expect)(next.value).to.equal(1);
            (0, chai_1.expect)(next.done).to.equal(false);
            next = iter.next();
            (0, chai_1.expect)(next.value).to.equal(2);
            (0, chai_1.expect)(next.done).to.equal(false);
            next = iter.next();
            (0, chai_1.expect)(next.value).to.equal(undefined);
            (0, chai_1.expect)(next.done).to.equal(true);
        });
    });
});
