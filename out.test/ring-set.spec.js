"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var ring_set_1 = require("./ring_set");
(0, mocha_1.describe)("RingSet", function () {
    (0, mocha_1.describe)("if a value does not already exist in the RingSet", function () {
        (0, mocha_1.describe)("append(value)", function () {
            (0, mocha_1.it)("should append the value", function () {
                var ringSet = new ring_set_1.default([1, 2]);
                ringSet.append(3);
                var iterator = ringSet.iterator();
                iterator.next(); // skip 1
                iterator.next(); // skip 2
                (0, chai_1.expect)(iterator.next().value).to.equal(3);
            });
        });
        (0, mocha_1.describe)("prepend(value)", function () {
            (0, mocha_1.it)("should prepend a value at the start", function () {
                var ringSet = new ring_set_1.default([1, 2]);
                ringSet.prepend(3);
                var iterator = ringSet.iterator();
                (0, chai_1.expect)(iterator.next().value).to.equal(3); // prepended value
                (0, chai_1.expect)(iterator.next().value).to.equal(1);
                (0, chai_1.expect)(iterator.next().value).to.equal(2);
            });
        });
    });
});
