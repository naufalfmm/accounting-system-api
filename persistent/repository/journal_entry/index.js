'use strict';

const dayjs = require('dayjs');
const { number_to_roman } = require('../../../utils/roman');
const { Op } = require('sequelize');

module.exports = class journal_entry_repository {
    resource
    journal_entry

    constructor(resource) {
        this.resource = resource
        this.journal_entry = require('../../../model/dao').db.journal_entry
    }

    generate_code = async (dt) => {
        try {
            const count = await this.journal_entry.count({
                where: {
                    datetime: {
                        [Op.gte]: dt.startOf('date').toDate(),
                        [Op.lte]: dt.endOf('date').toDate()
                    }
                }
            })

            return `JO/${dt.year().toString()}/${number_to_roman(dt.month() + 1)}/${number_to_roman(dt.date())}/${count+1}`
        } catch (error) {
            throw error;
        }
    }

    create = async (data) => {
        try {
            data.code = await this.generate_code(data.datetime)

            return await this.journal_entry.create(data, {transaction: this.resource.pgsql.trx})
        } catch (error) {
            throw error;
        }
    }
}