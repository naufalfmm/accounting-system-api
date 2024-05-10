'use strict'

module.exports = class usecase {
    account_book
    account_type
    journal_entry
    account_balance_sheet

    constructor(account_book, account_type, journal_entry, account_balance_sheet) {
        this.account_book = account_book
        this.account_type = account_type
        this.journal_entry = journal_entry
        this.account_balance_sheet = account_balance_sheet
    }
}