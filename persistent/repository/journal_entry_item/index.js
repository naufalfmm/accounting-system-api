'use strict';

const dayjs = require('dayjs');
const { Op, Sequelize } = require('sequelize');
const { pagination } = require('../../../utils/pagination_helper');

module.exports = class journal_entry_item_repository {
    resource
    journal_entry_item

    constructor(resource) {
        this.resource = resource
        this.journal_entry_item = require('../../../model/dao').db.journal_entry_item
    }

    create = async (data) => {
        try {
            return await this.journal_entry_item.create(data, {transaction: this.resource.pgsql.trx})
        } catch (error) {
            throw error;
        }
    }

    bulk_create = async (items) => {
        try {
            return await this.journal_entry_item.bulkCreate(items, {validate: true, transaction: this.resource.pgsql.trx})
        } catch (error) {
            throw error;
        }
    }

    get_all = async (req) => {
        try {
            let where = {}

            if (req.filter_request !== undefined && req.filter_request !== null) {
                if (req.filter_request.account_book_id !== undefined && req.filter_request.account_book_id !== null) {
                    where[Op.and] = [
                        Sequelize.where(Sequelize.col('journal_entry.account_book_id'), req.filter_request.account_book_id)
                    ]
                }

                if (req.filter_request.month_date !== undefined && req.filter_request.month_date !== null) {
                    where[Op.and] = [
                        Sequelize.where(Sequelize.col('journal_entry.datetime'), {
                            [Op.gte]: req.filter_request.month_date.toDate(),
                            [Op.lte]: req.filter_request.month_date.endOf('month').toDate()
                        }),
                        {...where}
                    ]
                }
            }

            let orders = [],
                order_map = {
                    'datetime': 'journal_entry.datetime'
                }
            
            for (let i = 0; i < req.order_requests.length; i++) {
                let order_key = req.order_requests[i],
                    order_term = 'ASC'
                if (order_key[0] == '-') {
                    order_key = order_key.slice(1)
                    order_term = 'DESC'
                }

                if (!order_map[order_key]) {
                    continue
                }

                orders.push([Sequelize.col(order_map[order_key]), order_term])
            }

            return await this.journal_entry_item.findAll({
                include: this.resource.pgsql.get_preloads(),
                where: where,
                order: orders,
            })
        } catch (error) {
            throw error;
        }
    }

    get_all_paginated = async (req) => {
        try {
            let where = {}

            if (req.filter_request !== undefined && req.filter_request !== null) {
                if (req.filter_request.account_book_id !== undefined && req.filter_request.account_book_id !== null) {
                    where[Op.and] = [
                        Sequelize.where(Sequelize.col('journal_entry.account_book_id'), req.filter_request.account_book_id)
                    ]
                }

                if (req.filter_request.month_date !== undefined && req.filter_request.month_date !== null) {
                    where[Op.and] = [
                        Sequelize.where(Sequelize.col('journal_entry.datetime'), {
                            [Op.gte]: req.filter_request.month_date.toDate(),
                            [Op.lte]: req.filter_request.month_date.endOf('month').toDate()
                        }),
                        {...where}
                    ]
                }
            }

            let orders = [],
                order_map = {
                    'datetime': 'journal_entry.datetime',
                    'created_at': 'JournalEntryItem.created_at'
                }
            
            for (let i = 0; i < req.order_requests.length; i++) {
                let order_key = req.order_requests[i],
                    order_term = 'ASC'
                if (order_key[0] == '-') {
                    order_key = order_key.slice(1)
                    order_term = 'DESC'
                }

                if (!order_map[order_key]) {
                    continue
                }

                orders.push([Sequelize.col(order_map[order_key]), order_term])
            }

            const items = await this.journal_entry_item.findAll({
                ...pagination(req.pagination_request.page, req.pagination_request.limit),
                include: this.resource.pgsql.get_preloads(),
                where: where,
                order: orders,
            })

            const total_data = await this.journal_entry_item.count({
                include: this.resource.pgsql.get_preloads(),
                where: where,
                order: orders,
            })

            return {
                total_data: total_data,
                items: items
            }
        } catch (error) {
            throw error;
        }
    }
}