'use strict';

const { root_type } = require("../../const/const");
const { all_entries_response_from_data } = require("./journal_entry");
const { pagination_response } = require("./pagination");

module.exports.account_book_response_from_dao = (dao) => {
    return {
        description: dao.description,
        fiscal_start_date: dao.fiscal_start_date,
        fiscal_end_date: dao.fiscal_end_date,
        created_at: dao.created_at,
        updated_at: dao.updated_at,
    }
}

module.exports.balance_sheet_response_from_data = (data) => {
    let balance_accounts = [],
        total_debit = 0,
        total_credit = 0
    for (let i = 0; i < root_type.all.length; i++) {
        if (!data[root_type.all[i]]) continue

        let accs = []
        for (let j = 0; j < data[root_type.all[i]].accounts.length; j++) {
            accs.push({
                code: data[root_type.all[i]].accounts[j].code,
                name: data[root_type.all[i]].accounts[j].name,
                debit_total: data[root_type.all[i]].accounts[j].debit_total,
                credit_total: data[root_type.all[i]].accounts[j].credit_total
            })

            total_debit += data[root_type.all[i]].accounts[j].debit_total
            total_credit += data[root_type.all[i]].accounts[j].credit_total
        }

        balance_accounts.push({
            root_type: root_type.all[i],
            total: data[root_type.all[i]].total,
            accounts: accs
        })
    }

    return {
        balance: (total_debit - total_credit),
        debit_total: total_debit,
        credit_total: total_credit,
        accounts: balance_accounts
    }
}

module.exports.complete_page_response_from_data = (data) => {
    const entry_resps = all_entries_response_from_data(data.journal_entry_items_pagination.items)
    return {
        id: data.id,
        description: data.description,
        debit_total: data.book_balance.debit_total,
        credit_total: data.book_balance.credit_total,
        balance: (data.book_balance.debit_total - data.book_balance.credit_total),
        entries_pagination: {
            ...pagination_response(data.journal_entry_items_pagination.page, data.journal_entry_items_pagination.limit, data.journal_entry_items_pagination.total_data),
            items: entry_resps,
        }
    }
}