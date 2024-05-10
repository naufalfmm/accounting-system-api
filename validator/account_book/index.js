'use strict'

const dayjs = require("dayjs")
const { body } = require("express-validator")
const { err } = require("../../const/const")

module.exports = class account_book_validator {
    create_validator = () => {
        return [
            body('description').
                isString().withMessage('Description must be text').
                exists().withMessage('Description must be exist'),
            body('fiscal_start_date').
                custom((val) => {
                    return dayjs(val).isValid()
                }).withMessage('Fiscal start date must be valid date').
                exists().withMessage('Fiscal start date must be exist'),
            body('fiscal_end_date').
                custom((val) => {
                    return dayjs(val).isValid()
                }).withMessage('Fiscal end date must be valid date').
                exists().withMessage('Fiscal end date must be exist').
                custom((val, {req}) => {
                    const fiscal_start_date = dayjs(req.body.fiscal_start_date)
                    const fiscal_end_date = dayjs(val)

                    if (fiscal_start_date.isAfter(fiscal_end_date)) {
                        throw err.fiscal_start_date_before_end_date
                    }

                    return true
                })
        ]
    }

    get_complete_page_validator = () => {
        return [
            param("id").
                isInt().withMessage("id must be number")
        ]
    }
}