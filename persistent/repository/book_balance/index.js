'use strict';

const { Op, QueryTypes } = require('sequelize');

module.exports = class book_balance_repository {
    resource
    book_balance

    constructor(resource) {
        this.resource = resource
        this.book_balance = require('../../../model/dao').db.book_balance
    }

    get_balance_by_book_id = async(id) => {
        try {
            return await this.resource.pgsql.orm().query(`
                SELECT
                    journal_entries.account_book_id AS book_id,
                    SUM(journal_entry_items.debit) AS debit_total,
                    SUM(journal_entry_items.credit) AS credit_total
                FROM journal_entries
                JOIN journal_entry_items ON journal_entry_items.journal_entry_id = journal_entries.id
                WHERE journal_entries.account_book_id = ${id}
                GROUP BY journal_entries.account_book_id
            `, {
                types: QueryTypes.SELECT,
                model: this.book_balance,
                mapToModel: true
            })
        } catch (error) {
            throw error;
        }
    }
}