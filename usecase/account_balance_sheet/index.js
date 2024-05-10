'use strict';

const dayjs = require("dayjs");
const { err, root_type } = require("../../const/const");

module.exports = class account_balance_sheet_usecase {
    persistent
    resource

    constructor(persistent, resource) {
        this.persistent = persistent
        this.resource = resource
    }

    get_all = async (req) => {
        try {
            const balance_sheets = await this.persistent.repository.account_balance_sheet.get_all({
                filter_request: {
                    account_book_id: req.account_book_id
                },
                order_requests: ['root_type', 'account_type_id']
            })

            let root_balances = {}
            for (let i = 0; i < root_type.all.length; i++) {
                root_balances[root_type.all[i]] = {
                    total: 0,
                    accounts: []
                }
            }

            for (let i = 0; i < balance_sheets.length; i++) {
                if (!root_balances[balance_sheets[i].root_type]) continue

                root_balances[balance_sheets[i].root_type].total += (balance_sheets[i].debit_total * balance_sheets[i].debit_sign + balance_sheets[i].credit_total * balance_sheets[i].credit_sign)
                root_balances[balance_sheets[i].root_type].accounts.push(balance_sheets[i])
            }

            return root_balances
        } catch (error) {
            throw error;
        }
    }

    create = async (req) => {
        try {
            const existing_books = await this.persistent.repository.account_book.get_all({
                filter_request: {
                    fiscal_start_date: req.fiscal_start_date,
                    fiscal_end_date: req.fiscal_end_date
                }
            })

            if (existing_books.length > 0) {
                throw err.fiscal_range_account_book_exist
            }

            const book = await this.persistent.repository.account_book.create({
                description: req.description,
                fiscal_start_date: req.fiscal_start_date,
                fiscal_end_date: req.fiscal_end_date,
                created_at: dayjs(),
                updated_at: dayjs()
            })

            return book
        } catch (error) {
            throw error;
        }
    }
}