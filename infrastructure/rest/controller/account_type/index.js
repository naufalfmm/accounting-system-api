'use strict'

const { validationResult } = require("express-validator")
const { status_code } = require("../../../../const/const")
const { simple_account_type_response_from_dao } = require("../../../../model/dto/account_type")
const { success_helper, error_helper, validation_error_helper } = require("../../../../utils/resp_helper")

module.exports = class account_type_controller {
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

            const data = await this.usecase.account_type.create({
                code: req.body.code,
                name: req.body.name,
                root_type: req.body.root_type
            })
            
            return success_helper(res, status_code.created, simple_account_type_response_from_dao(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }
}