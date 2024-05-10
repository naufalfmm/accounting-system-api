'use strict'

const dayjs = require("dayjs")
const { body, query, param } = require("express-validator")

module.exports = class journal_type_validator {
    record_validator = () => {
        return [
            body('datetime').
                exists().withMessage('Datetime must be exist').
                custom((val) => {
                    return dayjs(val).isValid()
                }),
            body('account_book_id').
                isInt().withMessage('Account book must be number').
                exists().withMessage('Account book must be exist'),
            body('items').isLength({min: 1}).withMessage("Journal items must be exist"),
            body('items.*.account_type_id').
                isInt().withMessage('Account type must be number').
                exists().withMessage('Account type must be exist'),
            body('items.*.debit').
                isNumeric().withMessage('Debit must be number').
                exists().withMessage('Debit must be exist'),
            body('items.*.credit').
                isNumeric().withMessage('Credit must be number').
                exists().withMessage('Credit must be exist'),
        ]
    }

    get_all_entries_validator = () => {
        return [
            query('month_date').
                custom((val) => {
                    if (val) {
                        return dayjs(val).isValid()
                    }

                    return true
                }).withMessage('Moth date must be valid date')
        ]
    }

    get_all_entries_book_validator = () => {
        return [
            param("id").
                isInt().withMessage("id must be number")
        ]
    }
}