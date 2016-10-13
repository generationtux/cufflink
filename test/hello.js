var assert = require('assert');
var add = require("../app.js").add;

describe("Hello World", function() {
    it('should add 2 + 2', () => {
        let result = add(2, 2);
        assert.equal(result, 4);
    });
});
