'use strict';

const { Op } = require('sequelize');

module.exports = class account_book_repository {
    resource
    account_book

    constructor(resource) {
        this.resource = resource
        this.account_book = require('../../../model/dao').db.account_book
    }

    create = async(data) => {
        try {
            return await this.account_book.create(data, {transaction: this.resource.pgsql.trx})
        } catch (error) {
            throw error;
        }
    }

    get_all = async(req) => {
        try {
            let filter = {}

            if (req.filter_request.fiscal_start_date !== null || req.filter_request.fiscal_start_date !== undefined) {
                filter['fiscal_start_date'] = {
                    [Op.gte]: req.filter_request.fiscal_start_date.toDate()
                }
            }

            if (req.filter_request.fiscal_end_date !== null || req.filter_request.fiscal_end_date !== undefined) {
                filter['fiscal_end_date'] = {
                    [Op.lte]: req.filter_request.fiscal_end_date.toDate()
                }
            }

            return await this.account_book.findAll({
                where: filter,
                include: this.resource.pgsql.get_preloads()
            })
        } catch (error) {
            throw error;
        }
    }

    get_by_id = async (id) => {
        try {
            return await this.account_book.findOne({
                where: {
                    id: id,
                }
            })
        } catch (error) {
            throw error;
        }
    }
}