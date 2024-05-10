'use strict'

const { body } = require("express-validator")
const { root_type, err } = require("../../const/const")

module.exports = class account_type_validator {
    create_validator = () => {
        return [
            body('code').
                isString().withMessage('Code must be string').
                exists().withMessage('Code must be exist'),
            body('name').
                isString().withMessage('Name must be string').
                exists().withMessage('Name must be exist'),
            body('root_type').
                isString().withMessage('Root type must be string').
                exists().withMessage('Root type must be exist').
                custom((val) => {
                    let i
                    for (i = 0; i < root_type.all.length; i++) {
                        if (val == root_type.all[i]) {
                            return true
                        }
                    }

                    throw err.invalid_format('Root type', val)
                })
        ]
    }
}