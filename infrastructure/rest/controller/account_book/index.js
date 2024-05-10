'use strict'

const dayjs = require("dayjs")
const { success_helper, error_helper, validation_error_helper } = require("../../../../utils/resp_helper")
const { account_book_response_from_dao, balance_sheet_response_from_data, complete_page_response_from_data } = require("../../../../model/dto/account_book")
const { status_code } = require("../../../../const/const")
const { validationResult } = require("express-validator")
const { pagination_request_from_req } = require("../../../../model/dto/pagination")

module.exports = class account_book_controller {
    usecase
    resource

    constructor(usecase, resource) {
        this.usecase = usecase
        this.resource = resource
    }

    create = async(req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const data = await this.usecase.account_book.create({
                description: req.body.description,
                fiscal_start_date: dayjs(req.body.fiscal_start_date),
                fiscal_end_date: dayjs(req.body.fiscal_end_date)
            })

            return success_helper(res, status_code.created, account_book_response_from_dao(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }

    get_balance = async(req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const balance = await this.usecase.account_balance_sheet.get_all({
                account_book_id: req.params.id
            })

            return success_helper(res, status_code.ok, balance_sheet_response_from_data(balance))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }

    get_complete_page = async(req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const data = await this.usecase.account_book.get_complete_page({
                pagination_request: pagination_request_from_req(req),
                id: req.params.id,
                order_requests: (req.order || "").split(",")
            })

            return success_helper(res, status_code.ok, complete_page_response_from_data(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }
}