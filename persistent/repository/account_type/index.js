'use strict';

const { where, Op } = require('sequelize');

module.exports = class account_type_repository {
    resource
    account_type

    constructor(resource) {
        this.resource = resource
        this.account_type = require('../../../model/dao').db.account_type
    }

    get_by_ids = async (ids) => {
        try {
            return await this.account_type.findAll({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            })
        } catch (error) {
            throw error;
        }
    }

    create = async(data) => {
        try {
            return await this.account_type.create(data, {transaction: this.resource.pgsql.trx})
        } catch (error) {
            throw error;
        }
    }
}