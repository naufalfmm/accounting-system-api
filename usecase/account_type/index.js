'use strict';

const dayjs = require("dayjs");

module.exports = class account_type_usecase {
    persistent
    resource

    constructor(persistent, resource) {
        this.persistent = persistent
        this.resource = resource
    }

    create = async (req) => {
        try {
            const acc_type = await this.persistent.repository.account_type.create({
                code: req.code,
                name: req.name,
                root_type: req.root_type,
                created_at: dayjs(),
                updated_at: dayjs()
            })

            return acc_type
        } catch (error) {
            throw error;
        }
    }
}