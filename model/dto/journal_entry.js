'use strict';

const { root_type } = require("../../const/const");
const { journal_entry_item_response_from_dao } = require("./journal_entry_item");

module.exports.journal_entry_response_from_dao = (dao) => {
    let journal_resp = {
        account_book_id: dao.account_book_id,
        code: dao.code,
        datetime: dao.datetime,
        description: dao.description,
        created_at: dao.created_at,
        updated_at: dao.updated_at,
    }

    if (dao.journal_entry_items) {
        let items = []
        for (let i = 0; i < dao.journal_entry_items.length; i++) {
            items.push(journal_entry_item_response_from_dao(dao.journal_entry_items[i]))
        }

        journal_resp['journal_entry_items'] = items
    }

    return journal_resp
}

module.exports.all_entries_response_from_data = (data) => {
    let resps = []
    for (let i = 0; i < data.length; i++) {
        resps.push({
            id: data[i].id,
            account_type_id: data[i].account_type_id,
            book_id: data[i].journal_entry.account_book_id,
            journal: data[i].journal_entry.code,
            datetime: data[i].journal_entry.datetime,
            notes: data[i].notes,
            debit: data[i].debit,
            credit: data[i].credit,
            account_type: {
                code: data[i].account_type.code,
                name: data[i].account_type.name,
                root_type: data[i].account_type.root_type
            },
            account_book: {
                description: data[i].journal_entry.account_book.description,
                fiscal_start_date: data[i].journal_entry.account_book.fiscal_start_date,
                fiscal_end_date: data[i].journal_entry.account_book.fiscal_end_date,
            }
        })
    }

    return resps
}