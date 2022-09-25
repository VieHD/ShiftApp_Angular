import { calc } from './index';

describe("Calculator", () => {

    it("should output 5, after passing 2 and 3", () => {
        const result = calc(2, 3);
        expect(result).toEqual(7);
    })

});