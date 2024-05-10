'use strict';

const dayjs = require("dayjs");
const { err } = require("../../const/const");
const { create_preload_by_model, preload_join_type, create_preload_by_alias } = require("../../resource/pgql/preload");

module.exports = class journal_entry_usecase {
    persistent
    resource

    constructor(persistent, resource) {
        this.persistent = persistent
        this.resource = resource
    }

    record = async (req) => {
        try {
            const book = await this.persistent.repository.account_book.get_by_id(req.account_book_id);
            if (!book) {
                throw err.record_not_found_format('Account book')
            }

            if (req.datetime.isBefore(dayjs(book.fiscal_start_date)) || req.datetime.isAfter(dayjs(book.fiscal_end_date))) {
                throw err.journal_date_out_of_range_book_fiscal_date
            }

            let debit = 0.0, 
                credit = 0.0
            
            for (let i = 0; i < req.items.length; i++) {
                debit += req.items[i].debit
                credit += req.items[i].credit
            }

            if (debit != credit) {
                throw err.debit_credit_journal_not_balance
            }

            await this.resource.pgsql.begin();
            const journal = await this.persistent.repository.journal_entry.create({
                datetime: req.datetime,
                account_book_id: req.account_book_id,
                description: req.code,
                created_at: dayjs(),
                updated_at: dayjs()
            })

            let journal_items = []
            for (let i = 0; i < req.items.length; i++) {
                journal_items.push({
                    journal_entry_id: journal.id,
                    account_type_id: req.items[i].account_type_id,
                    debit: req.items[i].debit,
                    credit: req.items[i].credit,
                    notes: req.items[i].notes,
                    created_at: dayjs(),
                    updated_at: dayjs()
                })
            }

            const items = await this.persistent.repository.journal_entry_item.bulk_create(journal_items)

            journal.journal_entry_items = items

            await this.resource.pgsql.commit();
            return journal 
        } catch (error) {
            await this.resource.pgsql.rollback();
            throw error;
        }
    }

    get_all_entries = async (req) => {
        try {
            this.resource.pgsql.preload.set([
                create_preload_by_model("JournalEntry", "journal_entry", null, preload_join_type.inner, [
                    create_preload_by_alias('account_book')
                ]),
                create_preload_by_model("AccountType", "account_type", null, preload_join_type.inner)
            ])
            
            if (!req.order_requests) {
                req.order_requests = ["datetime"]
            }

            return await this.persistent.repository.journal_entry_item.get_all(req)
        } catch (error) {
            throw error;
        }
    }
}