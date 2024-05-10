'use strict';

module.exports.number_to_roman = (number) => {
    const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const roms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

    let romans = ''

    for (let i = 0; i < nums.length;) {
        if (number == 0) break
        if (nums[i] > number) {
            i++
            continue
        }

        romans += roms[i]
        number -= nums[i]
    }

    return romans
}