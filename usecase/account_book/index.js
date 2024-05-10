'use strict';

const dayjs = require("dayjs");
const { err } = require("../../const/const");
const { create_preload_by_alias, create_preload_by_model, preload_join_type } = require("../../resource/pgql/preload");

module.exports = class account_book_usecase {
    persistent
    resource

    constructor(persistent, resource) {
        this.persistent = persistent
        this.resource = resource
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

    get_complete_page = async (req) => {
        try {
            const book = await this.persistent.repository.account_book.get_by_id(req.id)
            const book_balances = await this.persistent.repository.book_balance.get_balance_by_book_id(req.id)

            book['book_balance'] = book_balances[0]

            this.resource.pgsql.preload.set([
                create_preload_by_model("JournalEntry", "journal_entry", null, preload_join_type.inner, [
                    create_preload_by_alias('account_book')
                ]),
                create_preload_by_model("AccountType", "account_type", null, preload_join_type.inner)
            ])
            
            if (!req.order_requests) {
                req.order_requests = ["created_at"]
            }

            const entry_items = await this.persistent.repository.journal_entry_item.get_all_paginated(req)

            entry_items["page"] = req.pagination_request.page
            entry_items["limit"] = req.pagination_request.limit

            book['journal_entry_items_pagination'] = entry_items

            return book
        } catch (error) {
            throw error;
        }
    }
}