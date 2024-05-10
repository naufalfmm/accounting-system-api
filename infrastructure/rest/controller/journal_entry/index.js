'use strict'

const { validationResult } = require("express-validator")
const { status_code } = require("../../../../const/const")
const { journal_entry_response_from_dao, all_entries_response_from_data } = require("../../../../model/dto/journal_entry")
const { success_helper, error_helper, validation_error_helper } = require("../../../../utils/resp_helper")
const dayjs = require("dayjs")

module.exports = class journal_entry_controller {
    usecase
    resource

    constructor(usecase, resource) {
        this.usecase = usecase
        this.resource = resource
    }

    record = async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const data = await this.usecase.journal_entry.record({
                datetime: dayjs(req.body.datetime),
                account_book_id: req.body.account_book_id,
                description: req.body.description,
                items: req.body.items
            })

            return success_helper(res, status_code.ok, journal_entry_response_from_dao(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }

    get_all_entries = async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            let body_req = {
                filter_request: {}
            }
            if (req.query.month_date !== null && req.query.month_date !== undefined) {
                body_req.filter_request['month_date'] = dayjs(req.query.month_date)
            }

            const data = await this.usecase.journal_entry.get_all_entries(body_req)

            return success_helper(res, status_code.ok, all_entries_response_from_data(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }

    get_all_entries_book = async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            let body_req = {
                filter_request: {
                    account_book_id: req.params.id
                }
            }
            if (req.query.month_date !== null && req.query.month_date !== undefined) {
                body_req.filter_request['month_date'] = dayjs(req.query.month_date)
            }

            const data = await this.usecase.journal_entry.get_all_entries(body_req)

            return success_helper(res, status_code.ok, all_entries_response_from_data(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }
}