'use strict';

const { QueryTypes } = require('sequelize');

module.exports = class account_balance_sheet_repository {
    resource
    account_balance_sheet

    constructor(resource) {
        this.resource = resource
        this.account_balance_sheet = require('../../../model/dao').db.account_balance_sheet
    }

    get_all = async(req) => {
        try {
            let sq = `SELECT
                journal_entry_items.account_type_id,
                SUM(journal_entry_items.debit) AS debit_total,
                SUM(journal_entry_items.credit) AS credit_total
            FROM journal_entry_items
            JOIN journal_entries ON journal_entry_items.journal_entry_id = journal_entries.id`

            if (req.filter_request.account_book_id !== undefined || req.filter_request.account_book_id !== null) {
                sq += ` WHERE journal_entries.account_book_id = ${req.filter_request.account_book_id}`
            }

            sq += ` GROUP BY journal_entry_items.account_type_id`

            let mq = `SELECT
                    account_types.code,
                    account_types.name,
                    account_types.root_type,
                    account_types.debit_sign,
                    account_types.credit_sign,
                    balance_accounts.debit_total,
                    balance_accounts.credit_total
                FROM (${sq}) AS balance_accounts
                JOIN account_types ON account_types.id = balance_accounts.account_type_id
                ORDER BY ARRAY_POSITION(ARRAY['ASSETS', 'EXPENSES', 'LIABILITIES', 'EQUITY', 'REVENUE']::VARCHAR[], account_types.root_type) ASC,
                    account_types.id ASC;`,
                order_map = {
                    'root_type': `ARRAY_POSITION(ARRAY['ASSETS', 'EXPENSES', 'LIABILITIES', 'EQUITY', 'REVENUE']::VARCHAR[], account_types.root_type)`,
                    'account_type_id': `account_types.id`
                }

            let order_exist = false
            for (let i = 0; i < req.order_requests; i++) {
                let order_key = req.order_requests[i],
                    order_term = 'ASC'
                if (order_key[0] == '-') {
                    order_key = order_key.slice(1)
                    order_term = 'DESC'
                }

                if (!order_map[order_key]) {
                    continue
                }

                if (!order_exist) mq += ' ORDER BY'

                mq += ` ${order_map[order_key]} ${order_term}`
            }

            return await this.resource.pgsql.orm().query(mq, {
                types: QueryTypes.SELECT,
                model: this.account_balance_sheet,
                mapToModel: true
            })
        } catch (error) {
            throw error;
        }
    }
}