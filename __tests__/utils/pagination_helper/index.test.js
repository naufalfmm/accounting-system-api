'use strict';

const { pagination } = require("../../../utils/pagination_helper");

test('if page is 1, offset will be 0', () => {
    const res = pagination(1, 5)

    expect(res.offset).toBe(0)
    expect(res.limit).toBe(5)
})

test('if page is invalid of parsing, page will be 1 and offset will be zero', () => {
    const res = pagination("aaaa", 5)

    expect(res.offset).toBe(0)
    expect(res.limit).toBe(5)
})

test('if limit is invalid of parsing, offset will be calculated', () => {
    const res = pagination(3, "aaaa")

    expect(res.offset).toBe(200)
    expect(res.limit).toBe(100)
})